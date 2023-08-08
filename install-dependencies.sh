
echo "Installing dependencies..."

npm install typeorm @nestjs/typeorm --save
npm install dotenv
npm install pg --save
npm install @nestjs/graphql @nestjs/apollo @apollo/server graphql
npm install class-validator class-transformer

echo "Dependencies have been installed."