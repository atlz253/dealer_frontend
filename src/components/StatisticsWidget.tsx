import { FC } from "react";
import { Card, Spinner } from "react-bootstrap";

interface IStatisticsWidgetProps {
    value: number | null,
    name: string,
    className?: string
}

const StatisticsWidget: FC<IStatisticsWidgetProps> = ({ value, name, className }) => {
    return (
        <Card body className={className}>
            <h3 className="text-center">
                {
                    value ?
                        value
                        :
                        <Spinner animation="border" />
                }
            </h3>
            <div className="text-center text-nowrap">
                {name}
            </div>
        </Card>
    );
}

export default StatisticsWidget;