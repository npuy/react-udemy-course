interface PreviousSearchesProps {
  searches: string[];

  onPreviousSearchClicked: (search: string) => void;
}

export const PreviousSearches = ({
  searches,
  onPreviousSearchClicked,
}: PreviousSearchesProps) => {
  return (
    <div className="previous-searches">
      <h2>Previous searches</h2>
      <ul className="previous-searches-list">
        {searches.map((term) => (
          <li key={term} onClick={() => onPreviousSearchClicked(term)}>
            {term}
          </li>
        ))}
      </ul>
    </div>
  );
};
