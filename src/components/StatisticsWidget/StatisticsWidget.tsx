import classNames from "classnames";
import { FC } from "react";
import { Card } from "react-bootstrap";
import styles from "./StatisticsWidget.module.css";

interface IStatisticsWidgetProps {
    value: number,
    name: string,
    className?: string,
    isLoading?: boolean
}

const StatisticsWidget: FC<IStatisticsWidgetProps> = ({ value, name, className, isLoading }) => {
    return (
        <Card body className={classNames(className, isLoading ? styles.bodyLoading : undefined)}>
            <h3 className={classNames("text-center", isLoading ? styles.textHidden : styles.textVisible)}>
                {value}
            </h3>
            <div className={classNames("text-center text-nowrap", isLoading ? styles.textHidden : styles.textVisible)}>
                {name}
            </div>
        </Card>
    );
}

export default StatisticsWidget;