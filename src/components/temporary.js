for (let i = 0; i < this.rows; i++) {
  for (let j = 0; j < this.cols; j++) {
    let count = 0;
    if (i > 0) if (g[i - 1][j]) count++;
    if (i > 0 && j > 0) if (g[i - 1][j - 1]) count++;
    if (i > 0 && j < this.cols - 1) if (g[i - 1][j + 1]) count++;
    if (j < this.cols - 1) if (g[i][j + 1]) count++;
    if (j > 0) if (g[i][j - 1]) count++;
    if (i < this.rows - 1) if (g[i + 1][j]) count++;
    if (i < this.rows - 1 && j > 0) if (g[i + 1][j - 1]) count++;
    if (i < this.rows - 1 && j < this.cols - 1) if (g[i + 1][j + 1]) count++;
    if (g[i][j] && (count < 2 || count > 3)) g2[i][j] = false;
    if (!g[i][j] && count === 3) g2[i][j] = true;
  }
  }

for (let i = 1; i < this.rows-1; i++) {
  for (let j = 1; j < this.cols-1; j++) {
    let count = 0;
    if (g[i - 1][j]) count++;
    if (g[i - 1][j - 1]) count++;
    if (g[i - 1][j + 1]) count++;
    if (g[i][j + 1]) count++;
    if (g[i][j - 1]) count++;
    if (g[i + 1][j]) count++;
    if (g[i + 1][j - 1]) count++;
    if (g[i + 1][j + 1]) count++;
    if (g[i][j] && (count < 2 || count > 3)) g2[i][j] = false;
    if (!g[i][j] && count === 3) g2[i][j] = true;
  }
}