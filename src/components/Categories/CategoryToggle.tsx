import { FC, useContext } from "react";
import { AccordionContext, Card, useAccordionButton } from "react-bootstrap";
import styles from "./Categories.module.css";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";

interface ICategoryToggleProps {
  text?: string,
  eventKey: string,
  notClosable?: boolean,
  onClick?: () => any
}

const CategoryToggle: FC<ICategoryToggleProps> = ({ text, eventKey, notClosable, onClick }) => {
  const { activeEventKey } = useContext(AccordionContext);

  const decoratedOnClick = useAccordionButton(eventKey, onClick);

  const isActiveEventKey = activeEventKey === eventKey || Array.isArray(activeEventKey) && activeEventKey.includes(eventKey);

  return (
    <Card.Header
      onClick={notClosable ? undefined : decoratedOnClick}
      className={classNames(styles.header, "d-flex align-items-center justify-content-between rounded bg-body-secondary px-2")}
      style={notClosable ? undefined : { cursor: "pointer" }}
    >
      <h4 className={classNames("mb-0 user-select-none")}>
        {text}
      </h4>
      {
        !notClosable &&
        <FontAwesomeIcon
          icon={isActiveEventKey ? faAngleUp : faAngleDown}
        />
      }
    </Card.Header>
  );
}

export default CategoryToggle;