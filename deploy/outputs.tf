output "resource_group_name" {
  value = azurerm_resource_group.rg.name
}

output "frontend_fqdn" {
  value = azurerm_container_app.frontend_app.ingress[0].fqdn
}

output "api_fqdn" {
  value = azurerm_container_app.api_app.ingress[0].fqdn
}