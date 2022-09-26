import _ from "lodash";
import React from "react";
import DefaultDataFactory from "./data-factory/default";

const getTemplate = props => {
  const getFromDataFactory = () => {
    return <DefaultDataFactory {...props} />;
  };
  const templates = {
    getFromDataFactory
  };
  return templates[`getFrom${_.upperFirst(_.camelCase(props))}`]();
};

const Default = props => {
  return getTemplate(props);
};



export default Consumer(Default);
