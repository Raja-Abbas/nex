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
import KdChat from "../assets/images/kd-chat-icon-Photoroom.png";
import SaleorCommerce from "../assets/images/saleorCommerce.png";
import LagoImage from "../assets/images/lagoImage.png";
import CalImage from "../assets/images/calImage.png";
import MattermostImage from "../assets/images/mattermost.png";

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
    logo: KdChat,
    title: "K-d Chat",
    slug: "kd-chat",
    description: "Chat interface to prompt Ollama's dolphin-phi model",
    provider: "NexLayer",
    category: "Popular",
    Marketplacecategory: "Analytics",
    templateID: "0001",
    Downloads: "1.5K",
  },
  {
    logo: SaleorCommerce,
    title: "Saleor Commmerce",
    slug: "saleor-commerce",
    description: "High-performance e-commerce solution created with Python and Django",
    provider: "NexLayer",
    category: "Popular",
    Marketplacecategory: "Analytics",
    templateID: "0002",
    Downloads: "1.5K",
  },
  {
    logo: LagoImage,
    title: "Lago",
    slug: "lago",
    description: "Open Source Metering & Usage-Based Billing",
    provider: "NexLayer",
    category: "Popular",
    Marketplacecategory: "Analytics",
    templateID: "0003",
    Downloads: "1.5K",
  },
  {
    logo: CalImage,
    title: "Cal.com",
    slug: "cal.com",
    description: "The open-source Calendly successor",
    provider: "NexLayer",
    category: "Popular",
    Marketplacecategory: "Analytics",
    templateID: "0004",
    Downloads: "1.5K",
  },
  {
    logo: MattermostImage,
    title: "Mattermost",
    slug: "mattermost",
    description: "An open source platform for secure collaboration across the entire software development lifecycle",
    provider: "NexLayer",
    category: "Popular",
    Marketplacecategory: "Analytics",
    templateID: "0005",
    Downloads: "1.5K",
  },
  {
    logo: Node,
    title: "Node.js",
    slug: "nodejs",
    description: "A minimal Node.js web application.",
    provider: "NexLayer",
    category: "Popular",
    Marketplacecategory: "Analytics",
    Downloads: "1.5K",
  },
  {
    logo: Django,
    title: "Django",
    slug: "django",
    description: "A simple Django Application",
    provider: "NexLayer",
    category: "Latest",
    Marketplacecategory: "Analytics",
    Downloads: "783",
  },
  {
    logo: Flask,
    title: "Flask",
    slug: "flask",
    description: "A minimal Flask application",
    provider: "NexLayer",
    category: "New",
    Marketplacecategory: "AI/ML",
    Downloads: "200",
  },
  {
    logo: AnythingLLM,
    title: "AnythingLLM",
    slug: "anythingllm",
    description:
      "A multi-user ChatGPT for any LLMs and vector database with full privacy.",
    provider: "NexLayer",
    category: "All",
    tag:"true",
    text: "ai-powered-document-analysis",
    Marketplacecategory: "AI/ML",
    Downloads: "2K",
  },
  {
    logo: MongoDB,
    title: "MongoDB",
    slug: "mongodb",
    description: "Mongo database with data persistence and TCP Proxy",
    provider: "NexLayer",
    category: "All",
    Downloads: "456",
  },
  {
    logo: Strapi,
    title: "Strapi",
    slug: "strapi",
    description: "A popular self-hosted CMS",
    provider: "NexLayer",
    category: "All",
    Marketplacecategory: "Analytics",
    Downloads: "1K",
  },
  {
    logo: MySQL,
    title: "MySQL",
    slug: "mysql",
    description: "MySQL database with data persistence and TCP Proxy",
    provider: "NexLayer",
    category: "New",
    Marketplacecategory: "Authentication",
    Downloads: "994",
  },
  {
    logo: PostgreSQL,
    title: "PostgreSQL",
    slug: "postgresql",
    description: "PostgreSQL database with data persistence and TCP Proxy",
    provider: "NexLayer",
    category: "New",
    Marketplacecategory: "Authentication",
    Downloads: "400",
  },
  {
    logo: Flowise,
    title: "flowise-railway",
    slug: "flowise-railway",
    description: "Flowise - low- code LLM apps builder",
    provider: "NexLayer",
    category: "Latest",
    Marketplacecategory: "AI/ML",
    Downloads: "300",
  },
];

// export const templatesData = [
//   {
//     logo: Node,
//     title: "Node.js",
//     slug: "nodejs",
//     description: "A minimal Node.js web application.",
//     provider: "NexLayer",
//     category: "Popular",
//     Marketplacecategory: "Automation",
//   },
//   {
//     logo: MongoDB,
//     title: "MongoDB",
//     slug: "mongodb",
//     description: "Mongo database with data persistence and TCP Proxy",
//     provider: "NexLayer",
//     category: "All",
//     Marketplacecategory: "Blogs",
//   },
//   {
//     logo: Django,
//     title: "Django",
//     slug: "django",
//     description: "A simple Django Application",
//     provider: "Henry Heng",
//     category: "Latest",
//     Marketplacecategory: "Analytics",
//     Downloads: "783",
//   },
//   {
//     logo: Flask,
//     title: "Flask",
//     slug: "flask",
//     description: "A minimal Flask application",
//     provider: "Berry",
//     category: "New",
//     Marketplacecategory: "Observability",
//     Downloads: "200",
//   },
//   {
//     logo: Strapi,
//     title: "Strapi",
//     slug: "strapi",
//     description: "A popular self-hosted CMS",
//     provider: "Gabriel Luiz ...",
//     category: "All",
//     Marketplacecategory: "CMS",
//     Downloads: "400",
//   },
//   {
//     logo: MySQL,
//     title: "MySQL",
//     slug: "mysql",
//     description: "MySQL database with data persistence and TCP Proxy",
//     provider: "alphasec",
//     category: "New",
//     Marketplacecategory: "Authentication",
//     Downloads: "2K",
//   },
//   {
//     logo: PostgreSQL,
//     title: "PostgreSQL",
//     slug: "postgresql",
//     description: "PostgreSQL database with data persistence and TCP Proxy",
//     provider: "Muhammed ...",
//     category: "New",
//     Marketplacecategory: "Bots",
//     Downloads: "1K",
//   },
//   {
//     logo: Flowise,
//     title: "flowise-railway",
//     slug: "flowise-railway",
//     description: "Flowise - low- code LLM apps builder",
//     provider: "Henry Heng",
//     category: "Latest",
//     Marketplacecategory: "AI/ML",
//     Downloads: "4.8K",
//   },
//   {
//     logo: Flowise,
//     title: "flowise-railway",
//     slug: "flowise-railway",
//     description: "Flowise - low- code LLM apps builder",
//     provider: "Henry Heng",
//     category: "Latest",
//     Marketplacecategory: "Other",
//     Downloads: "4.8K",
//   },
//   {
//     logo: LibreChat,
//     title: "LibreChat",
//     slug: "librechat",
//     description: "ChatGPT clone GPT-4, Bing, Anthropic, DALL-E-3, Plugins, Multi-...",
//     provider: "Berry",
//     category: "Latest",
//     Marketplacecategory: "AI/ML",
//     Downloads: "1.5K",
//   },
//   {
//     logo: LibreChat,
//     title: "LibreChat",
//     slug: "librechat",
//     description: "ChatGPT clone GPT-4, Bing, Anthropic, DALL-E-3, Plugins, Multi-...",
//     provider: "Berry",
//     category: "Latest",
//     Marketplacecategory: "Starters",
//     Downloads: "1.5K",
//   },
//   {
//     logo: ChainLangflow,
//     title: "Langflow 1.0",
//     slug: "langflow-1-0",
//     description: "Simple Langflow deployment using PostgreSQL as the database.",
//     provider: "Gabriel Luiz ...",
//     category: "Latest",
//     Marketplacecategory: "AI/ML",
//     Downloads: "1.5K",
//   },
//   {
//     logo: ChainLangflow,
//     title: "Langflow 1.0",
//     slug: "langflow-1-0",
//     description: "Simple Langflow deployment using PostgreSQL as the database.",
//     provider: "Gabriel Luiz ...",
//     category: "Latest",
//     Marketplacecategory: "Storage",
//     Downloads: "1.5K",
//   },
//   {
//     logo: Chain,
//     title: "Langflow",
//     slug: "langflow",
//     description: "A drag-and-drop web interface for LangChain.",
//     provider: "aplhasec",
//     category: "Latest",
//     Marketplacecategory: "AI/ML",
//     Downloads: "830",
//   },
//   {
//     logo: Chain,
//     title: "Langflow",
//     slug: "langflow",
//     description: "A drag-and-drop web interface for LangChain.",
//     provider: "aplhasec",
//     category: "Latest",
//     Marketplacecategory: "Queues",
//     Downloads: "830",
//   },
//   {
//     logo: DialoqBase,
//     title: "Dialoqbase",
//     slug: "dialoqbase",
//     description: "Create chatbots with ease",
//     provider: "Muhammed ...",
//     category: "Latest",
//     Marketplacecategory: "AI/ML",
//     Downloads: "473",
//   },
//   {
//     logo: AnythingLLM,
//     title: "AnythingLLM",
//     slug: "anythingllm",
//     description: "The all-in-one app for private document chat, AI Agents, and more.",
//     provider: "Timothy Car ...",
//     category: "All",
//     tag: "true",
//     text: "ai-powered-document-analysis",
//     Marketplacecategory: "AI/ML",
//     Downloads: "440",
//   },
//   {
//     logo: LiamaIndex,
//     title: "Liama-Index",
//     slug: "liama-index",
//     description: "A Streamlit app for chatting with PDFs using LIamaIndex and LIamaParse.",
//     provider: "alphasec",
//     category: "All",
//     Marketplacecategory: "AI/ML",
//     Downloads: "367",
//   },
//   {
//     logo: Dify,
//     title: "Dify",
//     slug: "dify",
//     description: "An open-source LLM app development platform",
//     provider: "Jack",
//     category: "All",
//     Marketplacecategory: "AI/ML",
//     Downloads: "336",
//   },
//   {
//     logo: ChatBotUI,
//     title: "Chatbot UI",
//     slug: "chatbot-ui",
//     description: "An open-source ChatGPT UI alternative.",
//     provider: "alphasec",
//     category: "All",
//     Marketplacecategory: "AI/ML",
//     Downloads: "308",
//   },
// ];


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

export const BuildlogsData = [
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


export const DeploylogsData = [
  {
    timestamp: "7/24/2024, 15:51:27 UTC",
    message: "info: Checking cluster health",
    type: "success",
  },
  { timestamp: "7/24/2024, 15:51:28 UTC", message: "info:", type: "success", },
  { timestamp: "", message: "[+]ping ok", type: "success", },
  { timestamp: "", message: "[+]log ok", type: "success", },
  { timestamp: "", message: "[+]etcd ok", type: "success", },
  { timestamp: "", message: "[+]etcd-readiness ok", type: "success", },
  { timestamp: "", message: "[+]informer-sync ok", type: "success", },
  { timestamp: "", message: "[+]poststarthook/start-kube-apiserver-admission-initializer ok", type: "success", },
  { timestamp: "", message: "[+]poststarthook/generic-apiserver-start-informers ok", type: "success", },
  { timestamp: "", message: "[+]poststarthook/priority-and-fairness-config-consumer ok", type: "success", },
  { timestamp: "", message: "[+]poststarthook/priority-and-fairness-filter ok", type: "success", },
  { timestamp: "", message: "[+]poststarthook/storage-object-count-tracker-hook ok", type: "success", },
  { timestamp: "", message: "[+]poststarthook/start-apiextensions-informers ok", type: "success", },
  { timestamp: "", message: "[+]poststarthook/start-apiextensions-controllers ok", type: "success", },
  { timestamp: "", message: "[+]poststarthook/crd-informer-synced ok", type: "success", },
  { timestamp: "", message: "[+]poststarthook/start-service-ip-repair-controllers ok", type: "success", },
  { timestamp: "", message: "[+]poststarthook/rbac/bootstrap-roles ok", type: "success", },
  { timestamp: "", message: "[+]poststarthook/scheduling/bootstrap-system-priority-classes ok", type: "success", },
  { timestamp: "", message: "[+]poststarthook/priority-and-fairness-config-producer ok", type: "success", },
  { timestamp: "", message: "[+]poststarthook/start-system-namespaces-controller ok", type: "success", },
  { timestamp: "", message: "[+]poststarthook/bootstrap-controller ok", type: "success", },
  { timestamp: "", message: "[+]poststarthook/start-cluster-authentication-info-controller ok", type: "success", },
  { timestamp: "", message: "[+]poststarthook/start-kube-apiserver-identity-lease-controller ok", type: "success", },
  { timestamp: "", message: "[+]poststarthook/start-kube-apiserver-identity-lease-garbage-collector ok", type: "success", },
  { timestamp: "", message: "[+]poststarthook/start-legacy-token-tracking-controller ok", type: "success", },
  { timestamp: "", message: "[+]poststarthook/aggregator-reload-proxy-client-cert ok", type: "success", },
  { timestamp: "", message: "[+]poststarthook/start-kube-aggregator-informers ok", type: "success", },
  { timestamp: "", message: "[+]poststarthook/apiservice-registration-controller ok", type: "success", },
  { timestamp: "", message: "[+]poststarthook/apiservice-status-available-controller ok", type: "success", },
  { timestamp: "", message: "[+]poststarthook/kube-apiserver-autoregistration ok", type: "success", },
  { timestamp: "", message: "[+]autoregister-completion ok", type: "success", },
  { timestamp: "", message: "[+]poststarthook/apiservice-openapi-controller ok", type: "warning",},
  { timestamp: "", message: "[+]poststarthook/apiservice-openapiv3-controller ok", type: "success", },
  { timestamp: "", message: "[+]poststarthook/apiservice-discovery-controller ok", type: "success", },
  { timestamp: "", message: "[+]shutdown ok", type: "success", },
  { timestamp: "", message: "readyz check passed", type: "success", },
  { timestamp: "7/24/2024, 15:51:28 UTC", message: "info: Starting deployment for image kd-chat", type: "success", },
  { timestamp: "7/24/2024, 15:51:29 UTC", message: "info: PING", type: "success", },
  { timestamp: "7/24/2024, 15:51:30 UTC", message: "info: Creating deployment...", type: "success", },
  { timestamp: "7/24/2024, 15:51:31 UTC", message: "info: PING", type: "success", },
  { timestamp: "7/24/2024, 15:51:32 UTC", message: "info: Deployment kd-chat successfully created.", type: "success", },
  { timestamp: "7/24/2024, 15:51:33 UTC", message: "info: PING", type: "success", },
  { timestamp: "7/24/2024, 15:51:34 UTC", message: "info: Creating service...", type: "success", },
  { timestamp: "7/24/2024, 15:51:35 UTC", message: "info: Service kd-chat-service successfully created.", type: "success", },
  { timestamp: "7/24/2024, 15:51:36 UTC", message: "info: PING", type: "success", },
  { timestamp: "7/24/2024, 15:51:37 UTC", message: "info: Ingress kd-chat-ingress successfully created.", type: "success", },
  { timestamp: "7/24/2024, 15:51:38 UTC", message: "info: PING", type: "success", },
  { timestamp: "7/24/2024, 15:51:39 UTC", message: "info: Checking pod status...", type: "success", },
  { timestamp: "7/24/2024, 15:51:40 UTC", message: "info: PING", type: "success", },
  { timestamp: "", message: "| Pod Name                 | Pod Status | Container State(s) | Container Reason(s) |", type: "success", },
  { timestamp: "", message: "------------------------------------------------------------------------------------", type: "success", },
  { timestamp: "", message: "| kd-chat-5fcb9f9979-5p62s | Running    | Running            | ---                 |", type: "success", },
  { timestamp: "7/24/2024, 15:51:40 UTC", message: "info: Waiting for site to go live...", type: "success", },
  { timestamp: "7/24/2024, 15:51:42 UTC", message: "info: ...", type: "success", },
  { timestamp: "7/24/2024, 15:51:44 UTC", message: "info: kd-chat is live at http://thirsty-beaver.env.alpha.nexlayer.ai", type: "success", },
  { timestamp: "7/24/2024, 15:51:46 UTC", message: "info: Publishing deployment metadata...", type: "success", },
  { timestamp: "7/24/2024, 15:51:48 UTC", message: "info: Deployment Complete", type: "success", },
];


export const starsCardData = [
  { description: "🚀 Success! Your app is live and killing it worldwide. Let's keep tabs on performance and user vibes together!"},
  { description: "📈 Noticed a spike in traffic? I recommend scaling up your resources now to keep things smooth and speedy. Just say the word, and I'll handle the rest!" },
  { description: "🔧 Found a few areas for optimization! With a few tweaks, we can reduce load times by 20%. Want to review my suggestions and improve efficiency?" },
  { description: "⚠️ Detected a hiccup with the database connection in the latest deployment. I'm on it—rolling back to the last stable version to keep your service uninterrupted." }
];
