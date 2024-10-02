resource "random_pet" "rg_name" {
  prefix = var.resource_group_name_prefix
}

resource "azurerm_resource_group" "rg" {
  location = var.resource_group_location
  name     = random_pet.rg_name.id
}

resource "azurerm_container_app_environment" "ae" {
  name                = "Example-Environment"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
}

resource "azurerm_container_app" "frontend_app" {
  name                         = "case-based-explanations-app"
  container_app_environment_id = azurerm_container_app_environment.ae.id
  resource_group_name          = azurerm_resource_group.rg.name
  revision_mode                = "Single"

  template {
    container {
      name   = "nextjs"
      image  = "filipepcampos/frontend:latest"
      cpu    = 0.25
      memory = "0.5Gi"

      env {
        name  = "NEXTJS_API_HOST"
        value = "http://case-based-explanations-api"
      }
    }
  }

  ingress {
    allow_insecure_connections = true
    external_enabled           = true
    target_port                = 3000
    traffic_weight {
      latest_revision = true
      percentage      = 100
    }
  }
}

resource "azurerm_container_app" "api_app" {
  name                         = "case-based-explanations-api"
  container_app_environment_id = azurerm_container_app_environment.ae.id
  resource_group_name          = azurerm_resource_group.rg.name
  revision_mode                = "Single"

  template {
    container {
      name   = "fastapi"
      image  = "filipepcampos/api:latest"
      cpu    = 0.5
      memory = "1Gi"

      env {
        name  = "FASTAPI_STORAGE_URL_PREFIX"
        value = "https://sfduyxbv.blob.core.windows.net/case-based-explanations/testing"
      }
    }
  }

  ingress {
    allow_insecure_connections = true
    external_enabled           = false
    target_port                = 80
    traffic_weight {
      latest_revision = true
      percentage      = 100
    }
  }
}

resource "azurerm_container_app_custom_domain" "app_custom_domain" {
  name                                     = "explanations.fcampos.dev"
  container_app_id                         = azurerm_container_app.frontend_app.id

  lifecycle {
    // When using an Azure created Managed Certificate these values must be added to ignore_changes to prevent resource recreation.
    ignore_changes = [certificate_binding_type, container_app_environment_certificate_id]
  }

  depends_on = [ namecheap_domain_records.my-domain ]
}

resource "namecheap_domain_records" "my-domain" {
  domain = "fcampos.dev"
  mode = "MERGE"

  record {
    hostname = "explanations"
    type = "CNAME"
    address = azurerm_container_app.frontend_app.ingress[0].fqdn
  }

  record {
    hostname = "asuid.explanations"
    type = "TXT"
    address = azurerm_container_app_environment.ae.custom_domain_verification_id
  }
}
