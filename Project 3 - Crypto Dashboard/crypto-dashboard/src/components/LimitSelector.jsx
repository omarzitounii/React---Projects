const LimitSelector = ({limit, onLimitChange}) => {
  return (
    <div className="controls">
    <label htmlFor="limit">Show: </label>
    <select id="limit" value={limit} onChange={e => onLimitChange(Number(e.target.value))}>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="30">50</option>
        <option value="40">100</option>
    </select>
    </div>
  )
}

export default LimitSelector
