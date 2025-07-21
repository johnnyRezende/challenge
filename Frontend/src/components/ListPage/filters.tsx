import './filters.css';
type YesNoSelectProps = {
  value: string,
  onChange: (value: string) => void;
};

export function YesNoSelect({ value, onChange }: YesNoSelectProps) {

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    onChange?.(value); // notify parent if provided
  };

  return (
    <div className="flex flex-col">
      <select
        value={value}
        onChange={handleChange}
        className=""
      >
        <option value="">Yes/No</option>
        <option value="yes">Yes</option>
        <option value="no">No</option>
      </select>
    </div>
  );
};


type FilterByYearProps = {
  value: number,
  onChange: (value: string) => void;
};

export function FilterByYear({ value, onChange }: FilterByYearProps)
{
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  return (
    <div className="flex flex-col">
      <input
        type="number"
        placeholder="Filter by year"
        value={value ? value: ''}
        onChange={handleChange}
        className="border rounded px-2 py-1"
      />
    </div>
  );
};