import { useEffect, useState } from "react";
import { Spin, Table } from "antd";
import type { TableProps } from "antd";

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

const columns: TableProps<DataType>["columns"] = [
  {
    title: "email",
    dataIndex: "email",
    key: "email",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Feedback",
    dataIndex: "feedback",
    key: "feedback",
  },
];

const FeedbacksPage: React.FC = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/feedback`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch Feedbacks");
        }
        const res = await response.json();
        setData(res.data);
      } catch (error) {
        console.log("Error fetching Users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  return (
    <Spin spinning={loading} size="large">
      <Table columns={columns} dataSource={data} />
    </Spin>
  );
};
export default FeedbacksPage;
