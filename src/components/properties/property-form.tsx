export function PropertyForm() {
  return (
    <form className="form-panel">
      <div className="form-grid">
        <label className="field">
          <span>Nom du bien</span>
          <input defaultValue="Appartement Ixelles - Etangs" name="name" />
        </label>

        <label className="field">
          <span>Type</span>
          <select defaultValue="Appartement" name="type">
            <option>Appartement</option>
            <option>Maison</option>
            <option>Studio</option>
            <option>Immeuble de rapport</option>
            <option>Garage</option>
            <option>Commerce</option>
          </select>
        </label>

        <label className="field">
          <span>Rue</span>
          <input defaultValue="Rue de la Digue" name="street" />
        </label>

        <label className="field">
          <span>Numéro</span>
          <input defaultValue="42 bte 3" name="number" />
        </label>

        <label className="field">
          <span>Code postal</span>
          <input defaultValue="1050" name="postalCode" />
        </label>

        <label className="field">
          <span>Commune</span>
          <input defaultValue="Ixelles" name="municipality" />
        </label>

        <label className="field">
          <span>Région</span>
          <select defaultValue="Bruxelles-Capitale" name="region">
            <option>Bruxelles-Capitale</option>
            <option>Wallonie</option>
            <option>Flandre</option>
          </select>
        </label>

        <label className="field">
          <span>Revenu cadastral</span>
          <input defaultValue="1048" inputMode="numeric" name="cadastralIncome" />
        </label>

        <label className="field">
          <span>PEB/EPC</span>
          <select defaultValue="C" name="epcLabel">
            <option>A</option>
            <option>B</option>
            <option>C</option>
            <option>D</option>
            <option>E</option>
            <option>F</option>
            <option>G</option>
            <option>Inconnu</option>
          </select>
        </label>

        <label className="field">
          <span>Loyer hors charges</span>
          <input defaultValue="980" inputMode="numeric" name="monthlyRent" />
        </label>

        <label className="field">
          <span>Charges mensuelles</span>
          <input defaultValue="70" inputMode="numeric" name="monthlyCharges" />
        </label>

        <label className="field field-wide">
          <span>Notes internes</span>
          <textarea
            defaultValue="Fiche préparée pour centraliser les informations administratives du bien."
            name="notes"
            rows={4}
          />
        </label>
      </div>

      <div className="form-actions">
        <button className="button button-secondary" disabled type="button">
          Brouillon non enregistré
        </button>
        <button className="button button-primary" disabled type="button">
          Prévisualisation à venir
        </button>
      </div>
    </form>
  );
}
