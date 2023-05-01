import { FC } from "react";
import { Card, useAccordionButton } from "react-bootstrap";
import styles from "./Categories.module.css";
import classNames from "classnames";

interface ICategoryToggleProps {
  text?: string,
  eventKey: string,
  notClosable?: boolean,
  onClick?: () => any
}

const CategoryToggle: FC<ICategoryToggleProps> = ({ text, eventKey, notClosable, onClick }) => {
  const decoratedOnClick = useAccordionButton(eventKey, onClick);

  return (
    <Card.Header
      onClick={notClosable ? undefined : decoratedOnClick}
      className={classNames(styles.header, "rounded", "bg-body-secondary", "px-2")}
      style={notClosable ? undefined : {cursor: "pointer"}}
    >
      <h4 className="mb-0 user-select-none">
        {text}
      </h4>
    </Card.Header>
  );
}

export default CategoryToggle;