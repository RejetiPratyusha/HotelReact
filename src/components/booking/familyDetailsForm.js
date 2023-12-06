import { useState } from "react";
import { Card } from "react-bootstrap";

export function FamilyDetailsForm() {
  const [name, setName] = useState("");
  return (
    <div>
      <Card>
        <div className="card-header">
          <label>Customer Name</label>
          <div className="col-md-6 mb-4">
            <input
              type="text"
              className="form-control"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>
      </Card>
    </div>
  );
}

export default FamilyDetailsForm;
