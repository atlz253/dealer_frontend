import { Card, Accordion } from "react-bootstrap";
import CategoryToggle from "./CategoryToggle";
import { FC, ReactNode } from "react";
import style from "./Categories.module.css";
import classNames from "classnames";

interface ICategoryItemProps {
    name?: string,
    notClosable?: boolean,
    eventKey: string,
    children?: ReactNode,
    onClick?: () => any,
    className?: string
}

const CategoryItem: FC<ICategoryItemProps> = ({ name, notClosable, eventKey, children, onClick, className }) => {
    return (
        <Card className={classNames(style.category, "mt-1")}>
            <CategoryToggle
                text={name}
                eventKey={eventKey}
                notClosable={notClosable}
                onClick={onClick}
            />
            <Accordion.Collapse eventKey={eventKey}>
                <Card.Body className={classNames("px-0 ps-2", className)}>
                    {children}
                </Card.Body>
            </Accordion.Collapse>
        </Card>
    );
}

export default CategoryItem;