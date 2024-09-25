import os

from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from io import BytesIO
from PIL import Image

from .classifier_service import ImageClassifier


EXPLANATION_URL_PREFIX = os.environ.get("FASTAPI_STORAGE_URL_PREFIX", "./data")
MODEL_PATH = os.environ.get("FASTAPI_MODEL_PATH", "data/model.ckpt")
LOOKUP_TABLE_PATH = os.environ.get("FASTAPI_LOOKUP_TABLE_PATH", "data/lookup_table.pt")

app = FastAPI()
origins = [
    "*",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

image_classifier = ImageClassifier(MODEL_PATH, LOOKUP_TABLE_PATH)


async def read_image_file(file) -> Image.Image:
    image = Image.open(BytesIO(file))
    return image


@app.get("/", status_code=200)
def health_check() -> dict:
    return {"status": "OK"}


@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    extension = file.filename.split(".")[-1]
    assert extension in ("jpg", "jpeg", "png")
    image = await read_image_file(await file.read())

    new_image = Image.new("RGBA", image.size, "WHITE")
    new_image.paste(image, (0, 0), image)

    confidence, prediction, explanations = image_classifier.classify(new_image)

    url_explanations = []
    for explanation in explanations:
        url_explanations.append(EXPLANATION_URL_PREFIX + "/" + explanation)

    return {
        "prediction": prediction.item(),
        "confidence": confidence.item(),
        "explanations": url_explanations,
    }
