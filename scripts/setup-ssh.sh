#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

# Create the SSH directory if it doesn't exist
mkdir -p ~/.ssh

# Write the deploy key to a file
echo "$NEXT_VEKTOR_UI_GITHUB_DEPLOY_KEY_SECRET" | tr -d '\r' > ~/.ssh/id_rsa

# Set the correct permissions
chmod 600 ~/.ssh/id_rsa

# Add GitHub to known_hosts to prevent SSH from asking during the build
ssh-keyscan -t rsa github.com >> ~/.ssh/known_hosts

# Configure Git to use the key for github.com
git config core.sshCommand "ssh -i ~/.ssh/id_rsa -o StrictHostKeyChecking=no"
