variable "resource_group_location" {
  type        = string
  description = "Location of the resource group."
  default     = "westeurope"
}

variable "resource_group_name_prefix" {
  type        = string
  description = "Prefix of the resource group name that's combined with a random ID so name is unique in your Azure subscription"
  default     = "cbe-rg"
}

variable "storage_container_name" {
  type        = string
  description = "Name of the storage container."
  default     = "case-based-explanations"
}