# Setup dynamic ENVIRONMENT

- [Nx Issue: Adding envFile argument in nx serve / build for custom env loading](https://github.com/nrwl/nx/issues/7729#issuecomment-1318514444)

- [NX: Using environment variables in Angular applications](https://nx.dev/recipes/environment-variables/use-environment-variables-in-angular)

Create a `.env.serve` if you wish to use the service with your own
API key:

```env
# DEFAULT LOCAL DEVELOPMENT ENV SETTINGS
NX_API_URL=https://api.themoviedb.org/3
NX_IMG_URL=https://image.tmdb.org/t/p/w220_and_h330_face

NX_BEARER=[YOUR BEARER TOKEN]
NX_MSW_API_MOCKING=false
```
