#!/bin/bash
brew update
az login
az account set --subscription 902eea28-a154-4fcd-8fd7-d7105c4edca2
key=$(az functionapp keys set -g 519 -n WarehouseJS --key-type functionKeys --key-name default)
echo $key > src/key.json