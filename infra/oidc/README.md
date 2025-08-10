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


```bash
export TOUTABIS_VERSION='main'

git clone git@github.com:1718-io/toutabis.git ~/.infra.toutabis/

cd ~/.infra.toutabis/

git checkout ${TOUTABIS_VERSION}

cd infra/oidc

docker-compose up -d

```

here to gety https over the service i'll need reverse proxy and tls cert on reerse proxy side in front of service, and that's all, the best is maybe ai get it with public lets encrypt and caddy revers proxy 'i'll see that

