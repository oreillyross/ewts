import React from "react";
import { render } from "react-dom";
import Downshift from "downshift";

const items = [
  { tag: "HB" },
  { tag: "Israel" },
  { tag: "Incursion" },
  { tag: "FPM" }
];

const DescriptorTagInput = () => (
  <Downshift
    onChange={selection => alert(`You selected ${selection.tag}`)}
    itemToString={item => (item ? item.tag : "")}
  >
    {({
      getInputProps,
      getItemProps,
      getLabelProps,
      getMenuProps,
      isOpen,
      inputValue,
      highlightedIndex,
      selectedItem
    }) => (
      <div>
        <input {...getInputProps()} />
        <ul
          {...getMenuProps()}
          style={{ listStyleType: "none", padding: 0, margin: 0 }}
        >
          {isOpen
            ? items
                .filter(item => !inputValue || item.tag.includes(inputValue))
                .map((item, index) => (
                  <li
                    {...getItemProps({
                      key: item.tag,
                      index,
                      item,
                      style: {
                        backgroundColor:
                          highlightedIndex === index ? "lightgray" : "white",
                        fontWeight: selectedItem === item ? "bold" : "normal"
                      }
                    })}
                  >
                    {item.tag}
                  </li>
                ))
            : null}
        </ul>
      </div>
    )}
  </Downshift>
);

export default DescriptorTagInput;
