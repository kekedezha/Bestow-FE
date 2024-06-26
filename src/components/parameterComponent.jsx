import { useState } from "react";

const ParameterComponent = ({ data, handler, hasSelectionsHandler, getRandomInterests, currentInterests, currentGiftType, getRandomGiftTypes }) => {
  const title = data.title;
  const entries = data.data;
  const [selectedEntry, setSelectedEntry] = useState(null);

  const handleClick = (entry) => {
    setSelectedEntry(entry);
    handler(title, entry);
    hasSelectionsHandler(true);
  };

  const handleNextButtonOnInput = () => {
    hasSelectionsHandler(true);
  };

  const handleChange = (e) => {
    setSelectedEntry(e.target.value);
    handler(title, e.target.value);
  };

  const handleInterestsRefresh = () => {
    getRandomInterests()
  }

  const handleGiftTypeRefresh = () => {
    getRandomGiftTypes()
  }

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      {/* // Write-In Button */}
      {(title == "Gift Type" ||
        title == "Interests" ||
        title == "Occasion") && (
        <input
          type="text"
          name="userInput"
          placeholder="Write your own"
          className={`inputButton `}
          style={{
            opacity: 1.1,
            outlineColor: "#ffa514",
            border: "none",
            colorScheme: "white",
            boxShadow: "none",
          }}
          onChange={handleNextButtonOnInput}
          onBlur={handleChange}
          maxLength="45"
        />
      )}

      {title == "Giftee Name" && (
        <input
          type="text"
          name="userInput"
          placeholder="Enter name"
          className={`inputButton `}
          style={{
            opacity: 1.1,
            outlineColor: "#ffa514",
            border: "none",
            colorScheme: "white",
            boxShadow: "none",
          }}
          onChange={handleNextButtonOnInput}
          onBlur={handleChange}
          maxLength="25"
        />
      )}

      {/* Dropdown Button */}
      {title == "Relationship" && (
        <select
          type="button"
          name="relationship selection"
          className={`button`}
          onChange={handleChange}
        >
          <option value="" hidden>
            Select Another Relationship
          </option>
          <option value="Sibling">Sibling</option>
          <option value="Father In-law">Father In-Law</option>
          <option value="Mother In-law">Mother In-Law</option>
          <option value="Boss">Boss</option>
          <option value="Co-Worker">Co-Worker</option>
          <option value="Professor/Teacher">Professor/Teacher</option>
          <option value="Niece/Nephew">Niece/Nephew</option>
          <option value="Sister In-Law">Sister In-Law</option>
          <option value="Brother In-Law">Brother In-Law</option>
          <option value="Pet">Pet</option>
        </select>
      )}

      {entries.map((entry) => (
        <div key={entry} className="paramButtonContainer">
          {/* // Single Select Button */}
          {(title == "Age" ||
            title == "Gender" ||
            title == "Activity Level" ||
            title == "Personality" ||
            title == "Nature" ||
            title == "Price Range" ||
            title == "Occasion" ||
            title == "Relationship") && (
            <input
              type="button"
              name={entry}
              value={entry}
              className={`button ${
                selectedEntry === entry ? "paramButtonActive" : ""
              }`}
              style={{
                opacity: selectedEntry && selectedEntry !== entry ? 0.55 : 1.1,
              }}
              onClick={() => handleClick(entry)}
            />
          )}

        </div>
      ))}

      {/*  Multi Select Button */}
      {currentGiftType.map((giftTypeEntries) => (
      (title == "Gift Type") && (
        <>
          <input
            type="checkbox"
            name={giftTypeEntries}
            value={giftTypeEntries}
            id={giftTypeEntries}
            onClick={() => handleClick(giftTypeEntries)}
          />
          <label htmlFor={giftTypeEntries} className="checkbox-button">
            {giftTypeEntries}
          </label>
        </>
        ))
      )}

          {(title == "Gift Type") && (
            <a className="forgotPassword" onClick={handleGiftTypeRefresh}>Refresh for new ideas!</a>
          )}

      {/*  Multi Select Button */}
      {currentInterests.map((interestEntries) => (
        (title === "Interests") && (
          <div key={interestEntries}>
            <input
              type="checkbox"
              name={interestEntries}
              value={interestEntries}
              id={interestEntries}
              onClick={() => handleClick(interestEntries)}
            />
            <label htmlFor={interestEntries} className="checkbox-button">
              {interestEntries}
            </label>
          </div>
        )
      ))}
        
          {(title == "Interests") && (
            <a className="forgotPassword" onClick={handleInterestsRefresh}>Refresh for new ideas!</a>
          )}
    </form>
  );
};
export default ParameterComponent;
