import torch
import torch.nn as nn
from torchvision.transforms import ToTensor, Compose, Resize, Grayscale, Lambda
from net import Net

import os
from io import BytesIO
from PIL import Image

model_path = "./model.ckpt"

weights = torch.load(model_path, weights_only=False)["state_dict"]
weights = {k.replace("model.", ""): v for k, v in weights.items()}

model = Net()
model.load_state_dict(weights)
model.fc1 = nn.Identity()
model.fc2 = nn.Identity()
model.eval()

transform = Compose(
    [
        ToTensor(),
        Lambda(lambda x: x[:3]),
        Resize((28, 28)),
        Grayscale(num_output_channels=1),
    ],
)

val_dataset_path = "/home/filipe/dev/terraform/storage/dataset/mnist/testing"


def read_image_file(file) -> Image.Image:
    image = Image.open(BytesIO(file))
    return image


lookup_table = {}


for directory in os.listdir(val_dataset_path):
    print(f"Processing {directory}")
    for file in os.listdir(f"{val_dataset_path}/{directory}"):
        image = Image.open(f"{val_dataset_path}/{directory}/{file}")
        image = transform(image)
        image = image.unsqueeze(0)

        output = model(image)
        features = output.detach().numpy()[0]

        lookup_table[f"{directory}/{file}"] = features

torch.save(lookup_table, "lookup_table.pt")
