import torch
import torch.nn.functional as F
from torchvision.transforms import ToTensor, Compose, Resize, Grayscale, Lambda
from .net import Net
import numpy as np
from sklearn.neighbors import KDTree


class ImageClassifier:
    def __init__(self, model_path: str, lookup_table_path: str):
        weights = torch.load(model_path, weights_only=False)["state_dict"]
        weights = {k.replace("model.", ""): v for k, v in weights.items()}

        self.model = Net()
        self.model.load_state_dict(weights)
        self.model.eval()

        lookup_table = torch.load(lookup_table_path)
        self.path_array = np.array(list(lookup_table.keys()))
        embeddings_array = np.array(list(lookup_table.values()))
        self.tree = KDTree(embeddings_array)

        self.transform = Compose(
            [
                ToTensor(),
                Lambda(lambda x: x[:3]),
                Resize((28, 28)),
                Grayscale(num_output_channels=1),
                Lambda(lambda x: 1 - x),
            ],
        )

    def lookup_explanations(self, features):
        features = features.detach().numpy()
        _, nearest_idx = self.tree.query(features, k=6)  # TODO: Parameterize k

        explanations = self.path_array[nearest_idx][0]

        return explanations

    def classify(self, image):
        image = self.transform(image).unsqueeze(0)

        output, features = self.model.forward_with_features(image)

        softmax = F.softmax(output, dim=1)
        confidence, prediction = torch.max(softmax, 1)

        explanations = self.lookup_explanations(features)

        return confidence, prediction, explanations
