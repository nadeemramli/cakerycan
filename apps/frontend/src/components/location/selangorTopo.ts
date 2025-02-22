export const selangorTopo = {
  "type": "Topology",
  "arcs": [
    // Sabak Bernam - Northernmost district
    [[101.2, 3.8], [101.45, 3.85], [101.7, 3.8], [101.65, 3.65], [101.4, 3.6], [101.2, 3.7]],
    
    // Hulu Selangor - Northeast district
    [[101.7, 3.8], [101.95, 3.75], [102.0, 3.6], [101.9, 3.45], [101.75, 3.4], [101.65, 3.5], [101.65, 3.65]],
    
    // Kuala Selangor - Northwest district
    [[101.2, 3.5], [101.45, 3.55], [101.6, 3.5], [101.55, 3.3], [101.4, 3.25], [101.25, 3.35]],
    
    // Gombak - Central-east district
    [[101.75, 3.4], [101.95, 3.35], [102.0, 3.2], [101.9, 3.1], [101.8, 3.05], [101.7, 3.15]],
    
    // Petaling - Central district
    [[101.55, 3.2], [101.75, 3.25], [101.8, 3.1], [101.75, 2.95], [101.6, 2.9], [101.5, 3.05]],
    
    // Klang - West central district
    [[101.2, 3.2], [101.45, 3.15], [101.55, 3.05], [101.5, 2.85], [101.35, 2.8], [101.25, 2.95]],
    
    // Kuala Langat - Southwest district
    [[101.25, 2.8], [101.45, 2.75], [101.6, 2.7], [101.55, 2.55], [101.4, 2.5], [101.3, 2.65]],
    
    // Sepang - Southeast district
    [[101.6, 2.9], [101.8, 2.85], [101.9, 2.7], [101.85, 2.55], [101.7, 2.5], [101.65, 2.65]],
    
    // Hulu Langat - East district
    [[101.8, 3.05], [102.0, 3.1], [102.05, 2.95], [101.95, 2.8], [101.85, 2.85], [101.8, 2.95]]
  ],
  "transform": {
    "scale": [0.001, 0.001],
    "translate": [101.0, 2.4]
  },
  "objects": {
    "districts": {
      "type": "GeometryCollection",
      "geometries": [
        {
          "type": "Polygon",
          "properties": { "name": "Sabak Bernam", "id": "sabak-bernam" },
          "arcs": [[0]]
        },
        {
          "type": "Polygon",
          "properties": { "name": "Hulu Selangor", "id": "hulu-selangor" },
          "arcs": [[1]]
        },
        {
          "type": "Polygon",
          "properties": { "name": "Kuala Selangor", "id": "kuala-selangor" },
          "arcs": [[2]]
        },
        {
          "type": "Polygon",
          "properties": { "name": "Gombak", "id": "gombak" },
          "arcs": [[3]]
        },
        {
          "type": "Polygon",
          "properties": { "name": "Petaling", "id": "petaling" },
          "arcs": [[4]]
        },
        {
          "type": "Polygon",
          "properties": { "name": "Klang", "id": "klang" },
          "arcs": [[5]]
        },
        {
          "type": "Polygon",
          "properties": { "name": "Kuala Langat", "id": "kuala-langat" },
          "arcs": [[6]]
        },
        {
          "type": "Polygon",
          "properties": { "name": "Sepang", "id": "sepang" },
          "arcs": [[7]]
        },
        {
          "type": "Polygon",
          "properties": { "name": "Hulu Langat", "id": "hulu-langat" },
          "arcs": [[8]]
        }
      ]
    }
  }
}; 