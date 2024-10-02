variable "resource_group_location" {
  type        = string
  description = "Location of the resource group."
  default     = "westeurope"
}

variable "resource_group_name_prefix" {
  type        = string
  description = "Prefix of the resource group name that's combined with a random ID so name is unique in your Azure subscription"
  default     = "cberg"
}

variable "container_group_name_prefix" {
  type        = string
  description = "Prefix of the container group name that's combined with a random value so name is unique in your Azure subscription."
  default     = "acigroup"
}

variable "container_name_prefix" {
  type        = string
  description = "Prefix of the container name that's combined with a random value so name is unique in your Azure subscription."
  default     = "aci"
}

variable "restart_policy" {
  type        = string
  description = "The behavior of Azure runtime if container has stopped."
  default     = "Always"
  validation {
    condition     = contains(["Always", "Never", "OnFailure"], var.restart_policy)
    error_message = "The restart_policy must be one of the following: Always, Never, OnFailure."
  }
}

variable "namecheap_user_name" {
  type        = string
  description = "The username for the Namecheap API."
}

variable "namecheap_api_key" {
  type        = string
  description = "The API key for the Namecheap API."
}