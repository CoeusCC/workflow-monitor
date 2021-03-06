import React, { Component } from 'react';
import { formatMilliSecondToTime, parseMillisecondFromFormattedTime } from '../../../Utils/TimeUtils';
import { setFavicon } from '../../../Utils/FaviconUtils';
import ProblemCategoryAutocomplete from '../ProblemCategoryAutocomplete/ProblemCategoryAutocomplete';
import './style.css';

function getRealTimeClass(estimatedTime, realTime) {
  return estimatedTime ?
    (estimatedTime < realTime ? 'red' : 'green')
    : '';
}
function getRowClass(addedOnTheFly) {
  return addedOnTheFly ?
    'addedOnTheFly'
    : '';
}

class ResultRow extends Component {
  constructor(props) {
    super(props);
    this.initialEstimatedTime = props.estimatedTime;
    this.initialRealTime = props.realTime;
  }

  componentDidMount() {
    document.title = 'Caspr - Results';
    setFavicon('favicon');
  }

  handleProblemCategoryValueChange = (selectedOption) => {
    this.props.handleTaskChange(this.props.index, { problemCategory: selectedOption });
  };

  render() {
    const { index, addedOnTheFly, label, estimatedTime, realTime, problems, problemCategory} = this.props;
    const contentEditableProps = {
      contentEditable: true,
      suppressContentEditableWarning: true,
    };
    return (
      <tr className={getRowClass(addedOnTheFly)}>
        <td className="editable" {...contentEditableProps}>{label}</td>
        <td
          className="editable"
          {...contentEditableProps}
          onInput={(event) =>
            this.props.handleEditTime(index, 'estimatedTime', parseMillisecondFromFormattedTime(event.target.innerHTML))
          }
        >
          {formatMilliSecondToTime(this.initialEstimatedTime)}
        </td>
        <td
          className={`editable ${getRealTimeClass(estimatedTime, realTime)}`}
          {...contentEditableProps}
          onInput={(event) =>
            this.props.handleEditTime(index, 'realTime', parseMillisecondFromFormattedTime(event.target.innerHTML))
          }
        >
          {formatMilliSecondToTime(this.initialRealTime)}
        </td>
        <td className="editable problems-cell" {...contentEditableProps}>{problems}</td>
        <td>
          <ProblemCategoryAutocomplete
            value={problemCategory || null}
            onChange={this.handleProblemCategoryValueChange}
            placeholder={''}
          />
        </td>
      </tr>
    );
  }
}

export default ResultRow;
