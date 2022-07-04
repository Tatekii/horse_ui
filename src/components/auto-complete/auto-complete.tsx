import React, {
  FC,
  useState,
  ChangeEvent,
  KeyboardEvent,
  useEffect,
  useRef,
} from "react";
import classNames from "classnames";
import Input from "../input";
import Icon from "../icon";
import Transition from "../transition";
import useDebounce from "../../hooks/useDebounce";
import useClickOutside from "../../hooks/useClickOutside";
import { AutoCompleteProps, DataSourceType } from "./types";

export const AutoComplete: FC<AutoCompleteProps> = ({
  fetchSuggestions,
  onSelect,
  value,
  renderOption,
  ...restProps
}) => {
  // input value
  const [inputValue, setInputValue] = useState(value as string);

  // suggestion array
  const [suggestions, setSuggestion] = useState<DataSourceType[]>([]);
  // isLoading
  const [loading, setLoading] = useState(false);
  // show dropdown
  const [showDropdown, setShowDropdown] = useState(false);
  // hightlight dropdown
  const [highlightIndex, setHighlightIndex] = useState(-1);

  // triggerSearch 用作是否根据新的input值搜索的flag
  // 从suggestion中选择而改变input值时不应该再请求新的suggestion
  const triggerSearch = useRef(false);
  const componentRef = useRef<HTMLDivElement>(null);
  const debouncedValue = useDebounce(inputValue, 300);

  /** 点击了组件外部，关掉suggestion dropdown */
  useClickOutside(componentRef, () => {
    setSuggestion([]);
    setShowDropdown(false);
  });

  useEffect(() => {
    if (debouncedValue && triggerSearch.current === true) {
      setSuggestion([]);
      const results = fetchSuggestions(debouncedValue);
      if (results instanceof Promise) {
        setLoading(true);
        results.then((data) => {
          setLoading(false);
          setSuggestion(data);
          if (data.length > 0) {
            setShowDropdown(true);
          }
        });
      } else {
        setSuggestion(results);
        setShowDropdown(true);
        if (results.length > 0) {
          setShowDropdown(true);
        }
      }
    } else {
      setShowDropdown(false);
    }
    setHighlightIndex(-1);
  }, [debouncedValue, fetchSuggestions]);

  /** 计算高亮suggestion项 index */
  const highlight = (index: number) => {
    if (index < 0) index = 0;
    if (index >= suggestions.length) {
      index = suggestions.length - 1;
    }
    setHighlightIndex(index);
  };
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case "Enter":
        if (suggestions[highlightIndex]) {
          handleSelect(suggestions[highlightIndex]);
        }
        break;
      case "ArrowUp":
        highlight(highlightIndex - 1);
        break;
      case "ArrowDown":
        highlight(highlightIndex + 1);
        break;
      case "Escape":
        setShowDropdown(false);
        break;
      default:
        break;
    }
  };

  /** input框onChang */
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    triggerSearch.current = true;
    /** 设置input值 */
    setInputValue(value);
  };

  /** 选中建议项 */
  const handleSelect = (item: DataSourceType) => {
    /** 关闭dropdown */
    setShowDropdown(false);
    /** 自定义选中回调 */
    onSelect && onSelect(item);
    triggerSearch.current = false;
    /** 设置input值 */
    setInputValue(item.value);
  };

  const renderTemplate = (item: DataSourceType) => {
    return renderOption ? renderOption(item) : item.value;
  };

  const generateDropdown = () => {
    return (
      <Transition
        in={showDropdown || loading}
        animation="zoom-in-top"
        timeout={300}
        onExited={() => {
          setSuggestion([]);
        }}
      >
        <ul className="suggestion-list">
          {loading && (
            <div className="suggstions-loading-icon">
              <Icon icon="spinner" spin />
            </div>
          )}
          {suggestions.map((item, index) => {
            const cnames = classNames("suggestion-item", {
              "is-active": index === highlightIndex,
            });
            return (
              <li
                key={index}
                className={cnames}
                onClick={() => handleSelect(item)}
              >
                {renderTemplate(item)}
              </li>
            );
          })}
        </ul>
      </Transition>
    );
  };
  return (
    <div className="auto-complete" ref={componentRef}>
      <Input
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        {...restProps}
      />
      {generateDropdown()}
    </div>
  );
};

export default AutoComplete;
