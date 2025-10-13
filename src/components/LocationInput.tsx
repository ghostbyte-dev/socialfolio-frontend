import type React from "react";
import { useRef, useState } from "react";

type LocationData = {
  lat: string;
  lon: string;
  display_address: string;
};

type LocationInputProps = {
  onLocationChange: (data: LocationData) => void;
};

const LocationInput: React.FC<LocationInputProps> = ({ onLocationChange }) => {
  const [location, setLocation] = useState<string>("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocation(value);

    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      if (value.length > 2) {
        fetch(
          `https://api.locationiq.com/v1/autocomplete?key=${process.env.NEXT_PUBLIC_LOCATIONIQ_API_KEY}&q=${value}&limit=5&dedupe=1&`
        )
          .then((response) => response.json())
          .then((response: LocationData[]) => setSuggestions(response))
          .catch((err) => console.error("Error fetching suggestions:", err));
      } else {
        setSuggestions([]);
      }
    }, 500);
  };

  const handleLocationSelect = (selectedLocation: any) => {
    setLocation(selectedLocation.display_name);
    onLocationChange(selectedLocation);
    setSuggestions([]);
  };

  return (
    <div>
      <input
        id="location"
        type="text"
        value={location}
        onChange={handleInputChange}
        placeholder="City, Address, etc."
        className="input bg-surface-container-high w-full"
      />
      {suggestions?.length > 0 && (
        <div className="mt-2 bg-surface-container-high border border-outline rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {suggestions.map((suggestion) => (
            <div
              key={suggestion.place_id}
              onClick={() => handleLocationSelect(suggestion)}
              className="px-4 py-2 cursor-pointer hover:bg-surface-container transition-all"
            >
              {suggestion.display_name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LocationInput;
