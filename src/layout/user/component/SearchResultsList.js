import "./SearchResultsList.css";
import { Avatar, Button, List, Skeleton } from 'antd';
import { useProductContext } from "../../../services/helpers/getDataHelpers";
export const SearchResultsList = ({ results, setResults }) => {
    const { handleClickDetail } = useProductContext();
    return (
        <div className="results-list">
            <List
                className="demo-loadmore-list"
                itemLayout="horizontal"
                dataSource={results}
                renderItem={(item) => (
                    <List.Item

                    >
                        <Skeleton avatar title={false} loading={item.loading} active>
                            <List.Item.Meta
                                avatar={<Avatar src={`https://localhost:7285/Images/${item.image[0]}`} style={{ borderRadius: "5px" }} />}
                                title={<a onClick={() => handleClickDetail(item.id)}>{item.name}</a>}

                            />

                        </Skeleton>
                    </List.Item>
                )}
            />
        </div>
    );
};