#!/bin/bash

echo "==================================="
echo "Boat Reservation API - Code Validation"
echo "==================================="
echo ""

# Check Node.js version
echo "✓ Node.js version:"
node --version
echo ""

# Check npm version
echo "✓ npm version:"
npm --version
echo ""

# Check if all required packages are installed
echo "✓ Checking installed packages..."
npm list --depth=0 | grep -E "(express|mongoose|dotenv|cors|nodemon)"
echo ""

# Validate JavaScript syntax for all files
echo "✓ Validating JavaScript syntax..."
FILES=(
  "backend/server.js"
  "backend/config/db.js"
  "backend/models/boat.model.js"
  "backend/models/reservation.model.js"
  "backend/controllers/boat.controller.js"
  "backend/controllers/reservation.controller.js"
  "backend/routes/boat.routes.js"
  "backend/routes/reservation.routes.js"
)

for file in "${FILES[@]}"; do
  if node --check "$file" 2>/dev/null; then
    echo "  ✓ $file - OK"
  else
    echo "  ✗ $file - ERROR"
    exit 1
  fi
done
echo ""

# Check project structure
echo "✓ Project structure:"
tree -I 'node_modules' -L 2
echo ""

echo "==================================="
echo "✓ All validations passed!"
echo "==================================="
echo ""
echo "To run the server:"
echo "  1. Ensure MongoDB is running"
echo "  2. Copy .env.example to .env and configure"
echo "  3. Run: npm run dev"
echo ""
echo "API Endpoints:"
echo "  - GET/POST    /api/boats"
echo "  - GET/PUT/DELETE /api/boats/:id"
echo "  - GET/POST    /api/reservations"
echo "  - GET/PUT/DELETE /api/reservations/:id"
