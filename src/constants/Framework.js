import Node from "../assets/svgs/node.svg";
import Django from "../assets/svgs/django.svg";
import Flask from "../assets/svgs/flask.svg";
import AnythingLLM from "../assets/svgs/anythingLLM.svg";
import MongoDB from "../assets/svgs/mongoDB.svg";
import Strapi from "../assets/svgs/strapi.svg";
import MySQL from "../assets/svgs/mySQL.svg";
import PostgreSQL from "../assets/svgs/postgreSQL.svg";
import Flowise from "../assets/svgs/flowise.svg";
import BlueCube from "../assets/svgs/blueCube.svg";
import BlueGithubLogoCard from "../assets/svgs/blueGithubLogo.svg";
import NodejsTemplate from "../assets/svgs/nodejs2Template.svg";
import Nodejs from "../assets/svgs/nodejsTemplate.svg";
import ProjectXBox from "../assets/svgs/projectXBox.svg";
import GithubLogoCard from "../assets/svgs/githubLogoCard.svg";
import JsLogo from "../assets/svgs/node.svg";
import Globe from "../assets/svgs/globe.svg";
import TickCircle from "../assets/svgs/tick-circle.svg";


export const steps = [
  {
    id: 1,
    type: "step",
    heading: "Source",
    subheading: "Connected your service to your Github repo",
    image: "SourceLoadingState",
    buttons: [
      {
        label: "Repo Connected",
        action: "repoConnected",
        image: BlueGithubLogoCard,
      },
      { label: "Connect Image", action: "connectImage", image: NodejsTemplate },
    ],
  },
  {
    id: 2,
    type: "step",
    heading: "Build",
    description: "Success",
    builder: "Builder",
    image: "BuildLoadingState",
    details: [
      { label: "Project Name", value: "Nodejs", text: "white" },
      { label: "", value: "nodejs-template-patch-1", image: Nodejs, text: "white" },
      { label: "Time", value: "" },
      { label: "", value: "ProjextX Builder", image: ProjectXBox },
    ],
  },
  {
    id: 3,
    type: "step",
    heading: "Package",
    description: "Image created and pushed successfully",
    image: "PackageLoadingState",
  },
  {
    id: 4,
    type: "step",
    heading: "Deploy",
    description: "Deployment successful",
    image: "DeployLoadingState",
    details: [
      { label: "Deploying", value: "", text:"white" },
      { label: "", value: "sasdeployer /ndejs:latest", image: GithubLogoCard, text:'white' },
      { label: "Time", value: "" },
      { label: "", value: "Docterhub", image: ProjectXBox },
    ],
  },
  {
    id: 5,
    type: "final",
    heading: "Congratulations! Your app is now live!🚀",
    description: "",
    image: "DeployLoadingState",
    details: [
      { label: "", value: "NodeJs", image: JsLogo, text:"white" },
      { label: "Feedback", value: "Live" },
      { label: "Environment", value: "Production" },
      { label: "Cluster", value: "Kubernetes" },
      {
        label: "Link",
        url: "https://nodejs-3hp0.ondeployx.com",
        image: Globe,
      },
      {
        label: "Docker",
        value: "18 seconds ago via Docker Image",
        image: TickCircle,
      },
    ],
  },
];


export const cardsData = [
  {
    logo: Node,
    title: "Node.js",
    description: "A minimal Node.js web application.",
    provider: "NexLayer",
    category: "Popular",
  },
  {
    logo: Django,
    title: "Django",
    description: "A simple Django Application",
    provider: "NexLayer",
    category: "Latest",
  },
  {
    logo: Flask,
    title: "Flask",
    description: "A minimal Flask application",
    provider: "NexLayer",
    category: "News",
  },
  {
    logo: AnythingLLM,
    title: "AnythingLLM",
    description:
      "A multi-user ChatGPT for any LLMs and vector database with full privacy.",
    provider: "NexLayer",
    category: "All",
  },
  {
    logo: MongoDB,
    title: "MongoDB",
    description: "Mongo database with data persistence and TCP Proxy",
    provider: "NexLayer",
    category: "All",
  },
  {
    logo: Strapi,
    title: "Strapi",
    description: "A popular self-hosted CMS",
    provider: "NexLayer",
    category: "All",
  },
  {
    logo: MySQL,
    title: "MySQL",
    description: "MySQL database with data persistence and TCP Proxy",
    provider: "NexLayer",
    category: "News",
  },
  {
    logo: PostgreSQL,
    title: "PostgreSQL",
    description: "PostgreSQL database with data persistence and TCP Proxy",
    provider: "NexLayer",
    category: "News",
  },
  {
    logo: Flowise,
    title: "flowise-railway",
    description: "Flowise - low- code LLM apps builder",
    provider: "NexLayer",
    category: "Latest",
  },
];

export const deploymentData = {
  logo: Node,
  logoText: "NodeJs",
  feedback: "Live",
  environment: "Production",
  cluster: "Kubernetes",
  url: "https://nodejs-3hp0.ondeployx.com",
};

export const detailsData = {
  logo: BlueCube,
  logoTitle: "nexlayer-templates/nodejs-ssl:latest ",
  logoDescription: "DockerHub",
  region: "us-west1",
  numberOfReplicas: "1",
  restartPolicy: "On Failure",
  restartPolicyMaxRetries: "10",
};

export const logsData = [
  {
    timestamp: "2024-05-14 10:00:00",
    message: "Starting deployment process...",
    type: "success",
  },
  {
    timestamp: "2024-05-14 10:00:01",
    message: "Validating deployment configuration...",
    type: "success",
  },
  {
    timestamp: "2024-05-14 10:00:03",
    message: "Fetching deployment environment details...",
    type: "success",
  },
  {
    timestamp: "2024-05-14 10:00:05",
    message: "Deployment environment validated successfully.",
    type: "success",
  },
  { timestamp: "", message: "{{pipeline}}", type: "success", },
  { timestamp: "", message: "" },
  { timestamp: "", message: "{{if pipeline}} T1 {{end}}", type: "warning",},
  { timestamp: "", message: "{{if pipeline}} T1 {{else}} T0 {{end}}", type: "success", },
  {
    timestamp: "",
    message:
      "//If the value of the pipeline is empty, T0 is executed;",
      type: "error",
  },
  {
    timestamp: "",
    message:
      "otherwise, T1 is executed. Dot is unaffected.",
      type: "error",
  },
  {
    timestamp: "",
    message: "{{if pipeline}} T1 {{else if pipeline}} T0 {{end}}",
    type: "success",
  },
  {
    timestamp: "",
    message: "{{if pipeline}} T1 {{else}}{{if pipeline}} T0 {{end}}{{end}}",
    type: "success",
  },
  { timestamp: "", message: "" ,  type: "success",},
  { timestamp: "", message: "{{range pipeline}} T1 {{end}}" ,  type: "success", },
  { timestamp: "", message: "" },
  { timestamp: "", message: "{{range pipeline}} T1 {{else}} T0 {{end}}" ,  type: "success", },
  { timestamp: "", message: "{{break}}" ,  type: "success",},
  { timestamp: "", message: "" ,  type: "success",},
];

export const starsCardData = [
  { description: "🚀 Success! Your app is live and killing it worldwide. Let's keep tabs on performance and user vibes together!"},
  { description: "📈 Noticed a spike in traffic? I recommend scaling up your resources now to keep things smooth and speedy. Just say the word, and I'll handle the rest!" },
  { description: "🔧 Found a few areas for optimization! With a few tweaks, we can reduce load times by 20%. Want to review my suggestions and improve efficiency?" },
  { description: "⚠️ Detected a hiccup with the database connection in the latest deployment. I'm on it—rolling back to the last stable version to keep your service uninterrupted." }
];