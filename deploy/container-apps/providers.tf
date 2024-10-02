terraform {
  required_version = ">=1.0"

  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~>3.0"
    }

    random = {
      source  = "hashicorp/random"
      version = "~>3.0"
    }

    docker = {
      source  = "kreuzwerker/docker"
      version = "3.0.2"
    }

    namecheap = {
      source = "namecheap/namecheap"
      version = ">= 2.0.0"
    }
  }
}

provider "azurerm" {
  features {}
}

provider "docker" {
  host = "unix:///var/run/docker.sock"
}

provider "namecheap" {
  user_name = var.namecheap_user_name
  api_user = var.namecheap_user_name
  api_key = var.namecheap_api_key
  use_sandbox = false
}
