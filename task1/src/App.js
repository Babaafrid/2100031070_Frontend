import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [fields, setFields] = useState([]);
  const [nextId, setNextId] = useState(1);

  const addField = (type) => {
    const newField = {
      id: nextId,
      type: type,
      label: `${type.charAt(0).toUpperCase() + type.slice(1)} Input`,
    };
    setFields([...fields, newField]);
    setNextId(nextId + 1);
  };

  const removeField = (id) => {
    setFields(fields.filter(field => field.id !== id));
  };

  const updateLabel = (id, newLabel) => {
    setFields(fields.map(field => (field.id === id ? { ...field, label: newLabel } : field)));
  };

  const moveField = (id, direction) => {
    const index = fields.findIndex(field => field.id === id);
    if (index < 0) return;

    const newFields = [...fields];
    const [movedField] = newFields.splice(index, 1);
    newFields.splice(direction === 'up' ? index - 1 : index + 1, 0, movedField);
    setFields(newFields);
  };

  return (
    <div className="form-builder">
      <h2>Dynamic Form Builder</h2>
      <div className="form-container">
        {fields.map((field, index) => (
          <div key={field.id} className="form-field">
            <input
              type="text"
              value={field.label}
              onChange={(e) => updateLabel(field.id, e.target.value)}
              className="field-label"
            />
            {field.type === 'text' && <input type="text" className="field-input" />}
            {field.type === 'checkbox' && <input type="checkbox" className="field-input" />}
            {field.type === 'radio' && <input type="radio" className="field-input" />}
            <button onClick={() => moveField(field.id, 'up')} disabled={index === 0}>⬆️</button>
            <button onClick={() => moveField(field.id, 'down')} disabled={index === fields.length - 1}>⬇️</button>
            <button onClick={() => removeField(field.id)} className="remove-button">Remove</button>
          </div>
        ))}
      </div>
      <div className="button-group">
        <button onClick={() => addField('text')}>Add Text Input</button>
        <button onClick={() => addField('checkbox')}>Add Checkbox</button>
        <button onClick={() => addField('radio')}>Add Radio Button</button>
      </div>
    </div>
  );
};

export default App;
