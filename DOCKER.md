# Publish to Render without GitHub

This workflow runs on your computer: Docker builds and tests the project, you upload the image to Docker Hub, and Render runs that image. Docker Hub stores packaged images, so you do not need a Git repository. This is a manually started pipeline, not a hosted CI service that watches file changes.

## 1. Prepare accounts and Docker

Start Docker Desktop in Linux container mode. Create a Docker Hub account and a repository named `sly-devil` under your username. Choose public, or choose private and give Render a read-access Docker Hub token when connecting the image.

In PowerShell, open this project and sign in:

```powershell
cd D:\Programming\Projects\SlyDevil
docker login
```

## 2. Build and try the image locally

```powershell
docker build --platform linux/amd64 -t sly-devil:local .
docker run --rm -p 127.0.0.1:3000:3000 sly-devil:local
```

Open http://localhost:3000. Stop the foreground container with Ctrl+C. If port 3000 is already in use, publish `127.0.0.1:3001:3000` and visit port 3001 instead.

The build runs the game-rule tests before creating a runtime image. The app runs as the unprivileged `node` user and listens on all container interfaces. Render requires `linux/amd64` images.

## 3. Upload your first image

Replace `yourdockerusername` with your actual Docker Hub username:

```powershell
.\scripts\publish.ps1 -DockerUsername yourdockerusername -Push
```

The script builds, tests, and pushes both a timestamped version tag and `latest`. Without `-Push`, it only builds locally.

## 4. Connect Render

In the Render dashboard:

1. Choose **New > Web Service > Existing Image**.
2. Enter `docker.io/yourdockerusername/sly-devil:latest`.
3. Add registry credentials if the Docker Hub repository is private.
4. Choose your service name, region, and plan.
5. Deploy. The image supplies its start command and uses Render's `PORT` environment variable. Set the health check path to `/`.

Render gives the service a public URL. Initial deployment needs no deploy hook.

## 5. Publish updates

Run the same publish command after changing files. In Render, select **Manual Deploy > Deploy latest reference** to load the new image. Pushing `latest` alone does not trigger a Render deployment.

For a single-command update pipeline, copy the service's deploy hook from its Settings page into a local environment variable, then use `-Deploy`:

```powershell
$env:RENDER_DEPLOY_HOOK_URL = Read-Host 'Paste your Render deploy hook URL'
.\scripts\publish.ps1 -DockerUsername yourdockerusername -Push -Deploy
```

The hook URL grants permission to deploy; keep it out of source files. The script requests deployment of the timestamped image through the hook's `imgURL` parameter, after both uploads succeed. A successful request starts deployment; check Render for its final result. Keep versioned images in Docker Hub so earlier versions remain available for rollback.

Hosting does not change the current shared-device gameplay. Separate-device multiplayer still needs server-owned game sessions and private player connections.

References: [Docker build and push](https://docs.docker.com/get-started/tutorials/run-an-app/), [Render existing-image deployment](https://render.com/docs/deploying-an-image), [Render deploy hooks](https://render.com/docs/deploy-hooks).
