import React from "react";

function Dropedown({ title, options, fun }) {
  return (
    <div className="select">
      <select
        defaultValue="0"
        id="format"
        onChange={fun}
        className="bg-[#1F1E24] text-zinc-300 border border-zinc-700 rounded-md py-1 px-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#6556CD]"
      >
        <option value="0" disabled>
          {title}
        </option>
        {options.map((o, i) => (
          <option key={i} value={o}>
            {o.toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Dropedown;
