import _ from "lodash";
import PropTypes from "prop-types";
import React from "react";
import DefaultDataFactory from "./data-factory/default";

const getTemplate = props => {
  const getFromDataFactory = () => {
    return <DefaultDataFactory {...props} />;

  const templates = {
    getFromDataFactory
  };
  return templates[`getFrom${_.upperFirst(_.camelCase(props.arcSite))}`]();
};

const Default = props => {
  return getTemplate(props);
};

Default.propTypes = {
  arcSite: PropTypes.string,
  children: PropTypes.any,
  requestUri: PropTypes.any,
  contextPath: PropTypes.string,
  deployment: PropTypes.func,
  globalContent: PropTypes.any,
  globalContentConfig: PropTypes.any,
  Fusion: PropTypes.any,
  Libs: PropTypes.any
};

export default Consumer(Default);
