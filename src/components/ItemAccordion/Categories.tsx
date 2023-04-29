import { Accordion, Card } from "react-bootstrap"
import CategoryToggle from "./CategoryToggle";
import { Component, ReactNode } from "react";
import CategoryItem from "./CategoryItem";
import styles from "./Categories.module.css";

interface ICategoriesProps {
    children?: ReactNode,
    className?: string,
    defaultActiveKey?: string | string[],
    alwaysOpen?: boolean
}

class Categories extends Component<ICategoriesProps> {
    constructor(props: ICategoriesProps) {
        super(props);
    }

    public static get Item(): typeof CategoryItem {
        return CategoryItem;
    }

    public render() {
        return (
            <Accordion
                className={this.props.className}
                defaultActiveKey={this.props.defaultActiveKey}
                alwaysOpen={this.props.alwaysOpen}
            >
                {this.props.children}
            </Accordion>
        );
    }
}

export default Categories;