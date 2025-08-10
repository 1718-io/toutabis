# The OIDC PRovider

I try to find the really easiest fasteest way to get an OIDC provider

## Test 1

* https://pocket-id.org/docs/setup/installation

* First I configure on the windows machien the etc hosts for the pocket id service i provision in a debian vm:

```bash

echo '# --- ' | tee -a /c/Windows/System32/drivers/etc/hosts
echo '# - Pocket ID ' | tee -a /c/Windows/System32/drivers/etc/hosts
echo '192.168.1.16    pocket-id.pesto.io' | tee -a /c/Windows/System32/drivers/etc/hosts

```
