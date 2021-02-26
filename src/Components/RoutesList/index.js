import React from "react";
import classnames from "classnames";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { ReactComponent as Trash } from "assets/icons/trash.svg";

import styles from "./style.sass";

const cx = classnames.bind(styles);

const RoutesList = ({ routes, setRoutesList, handleRemove }) => {
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const items = reorder(
      routes,
      result.source.index,
      result.destination.index
    );

    setRoutesList(items);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <div
            className={cx("placemarks__list")}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {routes.map((item, index) => (
              <Draggable
                key={index}
                draggableId={index.toString()}
                index={index}
              >
                {(provided, snapshot) => (
                  <div
                    className={cx("placemarks__list-item")}
                    key={index}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <div className={cx("placemarks__list-item-text")}>
                      <p className={cx("placemarks__list-item-title")}>
                        {item.name}
                      </p>
                      <p>{item.description}</p>
                      <p>{item.Point.pos}</p>
                    </div>
                    <button onClick={() => handleRemove(item)}>
                      <Trash className={cx("placemarks__list-item-icon")} />
                    </button>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default RoutesList;
