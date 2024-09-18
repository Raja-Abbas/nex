import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDeploymentStatus,
  setDeploymentMessage,
} from "../redux/deploymentSlice";

const DeploymentStatusPolling = () => {
  const slug = useSelector((state) => state.deployment.slug);
  const dispatch = useDispatch();
  const namespace = useSelector((state) => state.deployment.namespace);
  const templateID = useSelector((state) => state.deployment.templateID);
  const url = useSelector((state) => state.deployment.url);
  const [polling, setPolling] = useState(true);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (namespace && templateID && polling) {
        dispatch(
          fetchDeploymentStatus({
            namespace,
            templateID,
            deploymentName: slug,
            url,
          }),
        ).then((action) => {
          const response = action.payload;

          if (response && response.message === "ready") {
            setPolling(false);
            dispatch(setDeploymentMessage(response.message));
          }
        });
      }
    }, 2000);

    return () => clearInterval(intervalId);
  }, [namespace, templateID, url, polling, dispatch, slug]);

  return null;
};

export default DeploymentStatusPolling;
