import Node from "../assets/svgs/node.svg";
import AnythingLLM from "../assets/svgs/anythingLLM.svg";
import BlueCube from "../assets/svgs/blueCube.svg";
import Nodejs from "../assets/svgs/nodejsTemplate.svg";
import ProjectXBox from "../assets/svgs/projectXBox.svg";
import GithubLogoCard from "../assets/svgs/githubLogoCard.svg";
import JsLogo from "../assets/svgs/node.svg";
import Globe from "../assets/svgs/globe.svg";
import TickCircle from "../assets/svgs/tick-circle.svg";
import KdChat from "../assets/images/kd-chat-icon-Photoroom.png";
import SaleorCommerce from "../assets/images/saleorCommerce.png";
import LagoImage from "../assets/images/lagoImage.png";
import CalImage from "../assets/images/cal.png";
import MattermostImage from "../assets/images/mattermost.png";
import Metabase from "../assets/images/materbase.png";

export const steps = [
  {
    id: 1,
    type: "step",
    heading: "Source",
    subheading: "Connected to your service",
    subtext: "Template Selected:",
    subtextvalue: "Nodejs",
    namepacetext: "Created namespace:",
    namespacetextvalue: "sharp-swan",
    image: "SourceLoadingState",
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
      {
        label: "",
        value: "nodejs-template-patch-1",
        image: Nodejs,
        text: "white",
      },
      { label: "Time", value: "" },
      { label: "", value: "NexLayer Builder", image: ProjectXBox },
    ],
  },
  // {
  //   id: 3,
  //   type: "step",
  //   heading: "Package",
  //   description: "Image created and pushed successfully",
  //   image: "PackageLoadingState",
  // },
  {
    id: 3,
    type: "step",
    heading: "Deploy",
    description: "Deployment successful",
    image: "DeployLoadingState",
    details: [
      { label: "Deploying", value: "", text: "white" },
      {
        label: "",
        value: "sasdeployer /ndejs:latest",
        image: GithubLogoCard,
        text: "white",
      },
      { label: "Time", value: "" },
      { label: "", value: "Docterhub", image: ProjectXBox },
    ],
  },
  {
    id: 4,
    type: "final",
    heading: "Congratulations! Your app is now live!🚀",
    description: "",
    image: "DeployLoadingState",
    details: [
      { label: "", value: "NodeJs", image: JsLogo, text: "white" },
      { label: "Status", value: "Live" },
      { label: "Environment", value: "Production" },
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
    title: "Kd Chat",
    slug: "kd-chat",
    description: "Chat interface to prompt Ollama's dolphin-phi model",
    provider: "NexLayer",
    category: "Popular",
    Marketplacecategory: "Analytics",
    templateID: "0001",
    Downloads: "1.5K",
  },
  {
    logo: CalImage,
    title: "Cal.com",
    slug: "cal",
    description: "The open-source Calendly successor",
    provider: "NexLayer",
    category: "Popular",
    Marketplacecategory: "Analytics",
    templateID: "0004",
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
    logo: SaleorCommerce,
    title: "Saleor Commmerce",
    slug: "saleor-commerce",
    description:
      "High-performance e-commerce solution created with Python and Django",
    provider: "NexLayer",
    category: "Popular",
    Marketplacecategory: "Analytics",
    templateID: "0002",
    Downloads: "1.5K",
  },
  {
    logo: MattermostImage,
    title: "Mattermost",
    slug: "mattermost",
    description:
      "An open source platform for secure collaboration across the entire software development lifecycle",
    provider: "NexLayer",
    category: "Popular",
    Marketplacecategory: "Analytics",
    templateID: "0005",
    Downloads: "1.5K",
  },
  {
    logo: AnythingLLM,
    title: "Anything LLM",
    slug: "anything-llm",
    description:
      "A full-stack application that enables you to turn any resource into context that any LLM can use as references during chatting",
    provider: "NexLayer",
    category: "All",
    tag: "true",
    text: "ai-powered-document-analysis",
    Marketplacecategory: "AI/ML",
    templateID: "0006",
    Downloads: "2K",
  },
  {
    logo: Metabase,
    title: "Metabase",
    slug: "metabase",
    description:
      "Open-source business intelligence platform",
    provider: "NexLayer",
    category: "All",
    tag: "true",
    text: "ai-powered-document-analysis",
    Marketplacecategory: "AI/ML",
    templateID: "0007",
    Downloads: "2K",
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
  { timestamp: "", message: "{{pipeline}}", type: "success" },
  { timestamp: "", message: "" },
  { timestamp: "", message: "{{if pipeline}} T1 {{end}}", type: "warning" },
  {
    timestamp: "",
    message: "{{if pipeline}} T1 {{else}} T0 {{end}}",
    type: "success",
  },
  {
    timestamp: "",
    message: "//If the value of the pipeline is empty, T0 is executed;",
    type: "error",
  },
  {
    timestamp: "",
    message: "otherwise, T1 is executed. Dot is unaffected.",
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
  { timestamp: "", message: "", type: "success" },
  { timestamp: "", message: "{{range pipeline}} T1 {{end}}", type: "success" },
  { timestamp: "", message: "" },
  {
    timestamp: "",
    message: "{{range pipeline}} T1 {{else}} T0 {{end}}",
    type: "success",
  },
  { timestamp: "", message: "{{break}}", type: "success" },
  { timestamp: "", message: "", type: "success" },
];

export const DeploylogsData = [
  {
    timestamp: "7/24/2024, 15:51:27 UTC",
    message: "info: Checking cluster health",
    type: "success",
  },
  { timestamp: "7/24/2024, 15:51:28 UTC", message: "info:", type: "success" },
  { timestamp: "", message: "[+]ping ok", type: "success" },
  { timestamp: "", message: "[+]log ok", type: "success" },
  { timestamp: "", message: "[+]etcd ok", type: "success" },
  { timestamp: "", message: "[+]etcd-readiness ok", type: "success" },
  { timestamp: "", message: "[+]informer-sync ok", type: "success" },
  {
    timestamp: "",
    message: "[+]poststarthook/start-kube-apiserver-admission-initializer ok",
    type: "success",
  },
  {
    timestamp: "",
    message: "[+]poststarthook/generic-apiserver-start-informers ok",
    type: "success",
  },
  {
    timestamp: "",
    message: "[+]poststarthook/priority-and-fairness-config-consumer ok",
    type: "success",
  },
  {
    timestamp: "",
    message: "[+]poststarthook/priority-and-fairness-filter ok",
    type: "success",
  },
  {
    timestamp: "",
    message: "[+]poststarthook/storage-object-count-tracker-hook ok",
    type: "success",
  },
  {
    timestamp: "",
    message: "[+]poststarthook/start-apiextensions-informers ok",
    type: "success",
  },
  {
    timestamp: "",
    message: "[+]poststarthook/start-apiextensions-controllers ok",
    type: "success",
  },
  {
    timestamp: "",
    message: "[+]poststarthook/crd-informer-synced ok",
    type: "success",
  },
  {
    timestamp: "",
    message: "[+]poststarthook/start-service-ip-repair-controllers ok",
    type: "success",
  },
  {
    timestamp: "",
    message: "[+]poststarthook/rbac/bootstrap-roles ok",
    type: "success",
  },
  {
    timestamp: "",
    message: "[+]poststarthook/scheduling/bootstrap-system-priority-classes ok",
    type: "success",
  },
  {
    timestamp: "",
    message: "[+]poststarthook/priority-and-fairness-config-producer ok",
    type: "success",
  },
  {
    timestamp: "",
    message: "[+]poststarthook/start-system-namespaces-controller ok",
    type: "success",
  },
  {
    timestamp: "",
    message: "[+]poststarthook/bootstrap-controller ok",
    type: "success",
  },
  {
    timestamp: "",
    message: "[+]poststarthook/start-cluster-authentication-info-controller ok",
    type: "success",
  },
  {
    timestamp: "",
    message:
      "[+]poststarthook/start-kube-apiserver-identity-lease-controller ok",
    type: "success",
  },
  {
    timestamp: "",
    message:
      "[+]poststarthook/start-kube-apiserver-identity-lease-garbage-collector ok",
    type: "success",
  },
  {
    timestamp: "",
    message: "[+]poststarthook/start-legacy-token-tracking-controller ok",
    type: "success",
  },
  {
    timestamp: "",
    message: "[+]poststarthook/aggregator-reload-proxy-client-cert ok",
    type: "success",
  },
  {
    timestamp: "",
    message: "[+]poststarthook/start-kube-aggregator-informers ok",
    type: "success",
  },
  {
    timestamp: "",
    message: "[+]poststarthook/apiservice-registration-controller ok",
    type: "success",
  },
  {
    timestamp: "",
    message: "[+]poststarthook/apiservice-status-available-controller ok",
    type: "success",
  },
  {
    timestamp: "",
    message: "[+]poststarthook/kube-apiserver-autoregistration ok",
    type: "success",
  },
  { timestamp: "", message: "[+]autoregister-completion ok", type: "success" },
  {
    timestamp: "",
    message: "[+]poststarthook/apiservice-openapi-controller ok",
    type: "warning",
  },
  {
    timestamp: "",
    message: "[+]poststarthook/apiservice-openapiv3-controller ok",
    type: "success",
  },
  {
    timestamp: "",
    message: "[+]poststarthook/apiservice-discovery-controller ok",
    type: "success",
  },
  { timestamp: "", message: "[+]shutdown ok", type: "success" },
  { timestamp: "", message: "readyz check passed", type: "success" },
  {
    timestamp: "7/24/2024, 15:51:28 UTC",
    message: "info: Starting deployment for image kd-chat",
    type: "success",
  },
  {
    timestamp: "7/24/2024, 15:51:29 UTC",
    message: "info: PING",
    type: "success",
  },
  {
    timestamp: "7/24/2024, 15:51:30 UTC",
    message: "info: Creating deployment...",
    type: "success",
  },
  {
    timestamp: "7/24/2024, 15:51:31 UTC",
    message: "info: PING",
    type: "success",
  },
  {
    timestamp: "7/24/2024, 15:51:32 UTC",
    message: "info: Deployment kd-chat successfully created.",
    type: "success",
  },
  {
    timestamp: "7/24/2024, 15:51:33 UTC",
    message: "info: PING",
    type: "success",
  },
  {
    timestamp: "7/24/2024, 15:51:34 UTC",
    message: "info: Creating service...",
    type: "success",
  },
  {
    timestamp: "7/24/2024, 15:51:35 UTC",
    message: "info: Service kd-chat-service successfully created.",
    type: "success",
  },
  {
    timestamp: "7/24/2024, 15:51:36 UTC",
    message: "info: PING",
    type: "success",
  },
  {
    timestamp: "7/24/2024, 15:51:37 UTC",
    message: "info: Ingress kd-chat-ingress successfully created.",
    type: "success",
  },
  {
    timestamp: "7/24/2024, 15:51:38 UTC",
    message: "info: PING",
    type: "success",
  },
  {
    timestamp: "7/24/2024, 15:51:39 UTC",
    message: "info: Checking pod status...",
    type: "success",
  },
  {
    timestamp: "7/24/2024, 15:51:40 UTC",
    message: "info: PING",
    type: "success",
  },
  {
    timestamp: "",
    message:
      "| Pod Name                 | Pod Status | Container State(s) | Container Reason(s) |",
    type: "success",
  },
  {
    timestamp: "",
    message:
      "------------------------------------------------------------------------------------",
    type: "success",
  },
  {
    timestamp: "",
    message:
      "| kd-chat-5fcb9f9979-5p62s | Running    | Running            | ---                 |",
    type: "success",
  },
  {
    timestamp: "7/24/2024, 15:51:40 UTC",
    message: "info: Waiting for site to go live...",
    type: "success",
  },
  {
    timestamp: "7/24/2024, 15:51:42 UTC",
    message: "info: ...",
    type: "success",
  },
  {
    timestamp: "7/24/2024, 15:51:44 UTC",
    message:
      "info: kd-chat is live at http://thirsty-beaver.env.alpha.nexlayer.ai",
    type: "success",
  },
  {
    timestamp: "7/24/2024, 15:51:46 UTC",
    message: "info: Publishing deployment metadata...",
    type: "success",
  },
  {
    timestamp: "7/24/2024, 15:51:48 UTC",
    message: "info: Deployment Complete",
    type: "success",
  },
];

export const starsCardData = [
  {
    description:
      "🚀 Success! Your app is live and killing it worldwide. Let's keep tabs on performance and user vibes together!",
  },
  {
    description:
      "📈 Noticed a spike in traffic? I recommend scaling up your resources now to keep things smooth and speedy. Just say the word, and I'll handle the rest!",
  },
  {
    description:
      "🔧 Found a few areas for optimization! With a few tweaks, we can reduce load times by 20%. Want to review my suggestions and improve efficiency?",
  },
  {
    description:
      "⚠️ Detected a hiccup with the database connection in the latest deployment. I'm on it—rolling back to the last stable version to keep your service uninterrupted.",
  },
];
