-- CreateTable
CREATE TABLE "Aplicacao" (
    "aplicacao_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "aplicacao_escopo" TEXT NOT NULL,
    "client_id" TEXT NOT NULL,
    "client_secret" TEXT NOT NULL,
    "request_uri" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Aplicacao_client_id_key" ON "Aplicacao"("client_id");

-- CreateIndex
CREATE UNIQUE INDEX "Aplicacao_client_secret_key" ON "Aplicacao"("client_secret");
