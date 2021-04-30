import { useRequest } from "alita";
import { notification, Button, message } from "antd";
import { generate } from "@/services/api";

const useDownload = () => {
  const { loading, run } = useRequest(generate, {
    manual: true,
    onSuccess: (result, params) => {
      if (!result.success) {
        message.error(result.message);
      }
      if (result && result.fileName) {
        const key = `open${Date.now()}`;
        const btn = (
          <Button
            type="primary"
            size="small"
            onClick={() => notification.close(key)}
          >
            确认
          </Button>
        );
        notification.open({
          message: "将在新页面中下载，请关闭弹窗拦截",
          description: "如果没有正确下载，请联系开发人员",
          btn,
          key,
          duration: null,
        });
        window.open(
          `http://${window.location.hostname}:8000/api/download/?fileName=${result.fileName}`
        );
      }
    },
  });
  return { loading, run };
};
export default useDownload;
