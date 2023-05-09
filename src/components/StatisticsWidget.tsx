import classNames from "classnames";
import { FC } from "react";
import { Card } from "react-bootstrap";

interface IStatisticsWidgetProps {
    value: number,
    name: string,
    className?: string,
    isLoading?: boolean
}

const StatisticsWidget: FC<IStatisticsWidgetProps> = ({ value, name, className, isLoading }) => {
    return (
        <Card body className={className}>
            <h3 className={classNames("text-center", isLoading ? "text-white" : undefined)}>
                {value}
            </h3>
            <div className={classNames("text-center text-nowrap", isLoading ? "text-white" : undefined)}>
                {name}
            </div>
        </Card>
    );
}

export default StatisticsWidget;