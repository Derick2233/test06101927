                document.addEventListener('DOMContentLoaded', () => {
                    const menuDiv = document.getElementById('menu');

                    // 현재 날짜를 YYYYMMDD 형식으로 가져오기
                    const today = new Date();
                    const year = today.getFullYear();
                    const month = ('0' + (today.getMonth() + 1)).slice(-2);
                    const day = ('0' + today.getDate()).slice(-2);
                    const todayDate = `${year}${month}${day}`;

                    // API URL
                    const apiUrl = `https://open.neis.go.kr/hub/mealServiceDietInfo?ATPT_OFCDC_SC_CODE=J10&SD_SCHUL_CODE=7531100&MLSV_YMD=${todayDate}&Type=json`;

                    fetch(apiUrl)
                        .then(response => response.json())
                        .then(data => {
                            if (data.mealServiceDietInfo && data.mealServiceDietInfo.length > 1 && data.mealServiceDietInfo[1].row && data.mealServiceDietInfo[1].row.length > 0) {
                                const menuItems = data.mealServiceDietInfo[1].row[0].DDISH_NM.split('<br/>');
                                const ul = document.createElement('ul');
                                menuItems.forEach(item => {
                                    const li = document.createElement('li');
                                    li.textContent = item.trim();
                                    ul.appendChild(li);
                                });
                                menuDiv.appendChild(ul);
                            } else {
                                menuDiv.textContent = "오늘의 급식 메뉴가 없습니다.";
                            }
                        })
                        .catch(error => {
                            console.error('Error fetching the menu data:', error);
                            menuDiv.textContent = "급식 메뉴를 불러오는 중 오류가 발생했습니다.";
                        });
                });
