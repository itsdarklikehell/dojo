
// Export/Import utility for Dojo
// Handles exporting and importing parties, monsters, encounters, maps, adventures, combats, and explorations

import localforage from 'localforage';

const ExportImport = {
  // Export all data as JSON
  exportAll: async () => {
    const data = {
      version: '1.0',
      exportDate: new Date().toISOString(),
      parties: await localforage.getItem('dojo-parties') || [],
      library: await localforage.getItem('dojo-library') || [],
      encounters: await localforage.getItem('dojo-encounters') || [],
      maps: await localforage.getItem('dojo-maps') || [],
      adventures: await localforage.getItem('dojo-adventures') || [],
      combats: await localforage.getItem('dojo-combats') || [],
      explorations: await localforage.getItem('dojo-explorations') || [],
      images: await localforage.getItem('dojo-images') || [],
      options: await localforage.getItem('dojo-options') || {}
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dojo-export-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  },

  // Import data from JSON file
  importAll: async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const data = JSON.parse(e.target.result);

          if (!data.version || !data.exportDate) {
            throw new Error('Invalid export file format');
          }

          // Import data
          if (data.parties) await localforage.setItem('dojo-parties', data.parties);
          if (data.library) await localforage.setItem('dojo-library', data.library);
          if (data.encounters) await localforage.setItem('dojo-encounters', data.encounters);
          if (data.maps) await localforage.setItem('dojo-maps', data.maps);
          if (data.adventures) await localforage.setItem('dojo-adventures', data.adventures);
          if (data.combats) await localforage.setItem('dojo-combats', data.combats);
          if (data.explorations) await localforage.setItem('dojo-explorations', data.explorations);
          if (data.images) await localforage.setItem('dojo-images', data.images);
          if (data.options) await localforage.setItem('dojo-options', data.options);

          resolve({ success: true, message: 'Import completed successfully' });
        } catch (err) {
          reject(err);
        }
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsText(file);
    });
  },

  // Export single party
  exportParty: async (party) => {
    const data = {
      version: '1.0',
      exportDate: new Date().toISOString(),
      party: party
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dojo-party-${party.name.replace(/\s+/g, '-').toLowerCase()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  },

  // Import single party
  importParty: async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const data = JSON.parse(e.target.result);

          if (!data.party) {
            throw new Error('Invalid party export file');
          }

          const parties = await localforage.getItem('dojo-parties') || [];
          parties.push(data.party);
          await localforage.setItem('dojo-parties', parties);

          resolve({ success: true, message: 'Party imported successfully' });
        } catch (err) {
          reject(err);
        }
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsText(file);
    });
  },

  // Export single monster
  exportMonster: async (monster) => {
    const data = {
      version: '1.0',
      exportDate: new Date().toISOString(),
      monster: monster
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dojo-monster-${monster.name.replace(/\s+/g, '-').toLowerCase()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  },

  // Import single monster
  importMonster: async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const data = JSON.parse(e.target.result);

          if (!data.monster) {
            throw new Error('Invalid monster export file');
          }

          const library = await localforage.getItem('dojo-library') || [];
          library.push(data.monster);
          await localforage.setItem('dojo-library', library);

          resolve({ success: true, message: 'Monster imported successfully' });
        } catch (err) {
          reject(err);
        }
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsText(file);
    });
  }
};

export default ExportImport;
