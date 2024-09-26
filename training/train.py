from torch import optim, utils, Tensor
from torch.utils.data import DataLoader
import torchvision
from torchvision.datasets import MNIST
import torchmetrics
import torch.nn.functional as F
import lightning as L

from net import Net


class MNISTClassifier(L.LightningModule):
    def __init__(self, model):
        super().__init__()
        self.model = model
        self.accuracy = torchmetrics.classification.Accuracy(
            task="multiclass",
            num_classes=10,
        )

    def training_step(self, batch: Tensor) -> Tensor:
        x, y = batch
        output = self.model(x)
        log_softmax = F.log_softmax(output, dim=1)

        loss = F.nll_loss(log_softmax, y)
        return loss

    def validation_step(self, batch: Tensor) -> Tensor:
        x, y = batch
        output = self.model(x)
        log_softmax = F.log_softmax(output, dim=1)
        loss = F.nll_loss(log_softmax, y)

        self.accuracy(F.softmax(output, dim=1), y)
        self.log("val_loss", loss)
        return loss

    def on_validation_epoch_end(self) -> None:
        self.log("val_acc_step", self.accuracy)

    def configure_optimizers(self) -> optim.Optimizer:
        optimizer = optim.Adam(self.model.parameters(), lr=1e-2, betas=(0.7, 0.9))
        return optimizer


class MNISTDataModule(L.LightningDataModule):
    def __init__(self, root, transform=None):
        super().__init__()
        if transform is None:
            transform = torchvision.transforms.ToTensor()

        dataset = MNIST(root, download=True, transform=transform)
        self.train_dataset, self.val_dataset, self.test_dataset = (
            utils.data.random_split(dataset, [0.7, 0.1, 0.2])
        )

    def train_dataloader(self) -> DataLoader:
        self.train_dataset.transform = torchvision.transforms.Compose(
            [
                torchvision.transforms.ToTensor(),
                torchvision.transforms.RandomHorizontalFlip(),
                torchvision.transforms.RandomVerticalFlip(),
                torchvision.transforms.RandomRotation(30),
            ],
        )
        return DataLoader(self.train_dataset, num_workers=7, batch_size=32)

    def test_dataloader(self) -> DataLoader:
        return DataLoader(self.test_dataset, num_workers=7, batch_size=32)

    def val_dataloader(self) -> DataLoader:
        return DataLoader(self.val_dataset, num_workers=7, batch_size=32)


def main():
    datamodule = MNISTDataModule("./data")

    classifier = MNISTClassifier(Net())

    trainer = L.Trainer(max_epochs=5)
    trainer.fit(model=classifier, datamodule=datamodule)


if __name__ == "__main__":
    main()
