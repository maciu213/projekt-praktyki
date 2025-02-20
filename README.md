Projekt projektu jest w figmie, dokumentacja w pliku.

git branch -vv | Where-Object { $_ -match 'gone\]' } | ForEach-Object { $_.Trim().Split()[0] } | ForEach-Object { git branch -D $_ }



