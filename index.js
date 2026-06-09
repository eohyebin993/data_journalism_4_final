document.addEventListener('DOMContentLoaded', () => {
    initHeatmap();
    initYouTubeTrendCharts();
    initSurveyChart();
    initMap();
});

// 차분한 블루 테마 색상 팔레트 (톤다운 & 투명도 적용)
const SOFT_BLUE = {
    primary: 'rgba(30, 58, 138, 0.7)', 
    secondary: 'rgba(59, 130, 246, 0.7)',
    accent: 'rgba(96, 165, 250, 0.7)',
    muted: 'rgba(147, 197, 253, 0.7)',
    pale: 'rgba(219, 234, 254, 0.7)'
};

// 1. 재난문자 발송 히트맵 (Matrix Chart)
function initHeatmap() {
    const canvas = document.getElementById('heatmapChart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const matrixData = [{"x": "2026-05-26", "y": 0, "v": 0, "alerts": []}, {"x": "2026-05-26", "y": 1, "v": 0, "alerts": []}, {"x": "2026-05-26", "y": 2, "v": 0, "alerts": []}, {"x": "2026-05-26", "y": 3, "v": 0, "alerts": []}, {"x": "2026-05-26", "y": 4, "v": 0, "alerts": []}, {"x": "2026-05-26", "y": 5, "v": 0, "alerts": []}, {"x": "2026-05-26", "y": 6, "v": 0, "alerts": []}, {"x": "2026-05-26", "y": 7, "v": 0, "alerts": []}, {"x": "2026-05-26", "y": 8, "v": 0, "alerts": []}, {"x": "2026-05-26", "y": 9, "v": 0, "alerts": []}, {"x": "2026-05-26", "y": 10, "v": 0, "alerts": []}, {"x": "2026-05-26", "y": 11, "v": 0, "alerts": []}, {"x": "2026-05-26", "y": 12, "v": 0, "alerts": []}, {"x": "2026-05-26", "y": 13, "v": 0, "alerts": []}, {"x": "2026-05-26", "y": 14, "v": 0, "alerts": []}, {"x": "2026-05-26", "y": 15, "v": 5, "alerts": [{"time": "15:24:13", "title": "금일 14:32경 서대문구 미근동 서소문고가 철거현장 붕괴사고 발생. 서대문역에서 경찰청앞 부분통제 통제중, 교통정보 확인 및 인근차량 우회바랍니다. [서대문구]N"}, {"time": "15:31:21", "title": "서울-신촌 간 서소문 고가 도로 철거 공사 중 붕괴로 열차 운행 중지 등 상당한 차질이 발생하고 있으니 타 교통 수단을 이용하여 주시기 바랍니다 [한국철도공사]N"}, {"time": "15:40:44", "title": "서울~신촌 간 서소문 고가도로 철거공사 중 붕괴로 서울~수색 구간 전동열차 운행중지 알림 △1호선 및 경의중앙선(문산~용산~용문) 정상운행 중[한국철도공사]N"}, {"time": "15:45:37", "title": "서울-신촌 간 서소문 고가 도로 철거  공사 중 붕괴로 열차 운행 중지 등 상당한 차질이 발생하고 있으니 타 교통 수단을 이용하여 주시기 바랍니다[한국철도공사]N"}, {"time": "15:59:44", "title": "오늘 14:32경 서울 서소문 고가도로 붕괴 사고로 인해, 경의중앙선 서울역행 열차는 수색역까지만 운행 중이며 용산 방면은 정상 운행합니다. [파주시]N"}]}, {"x": "2026-05-26", "y": 16, "v": 2, "alerts": [{"time": "16:06:34", "title": "현재 서소문고가 철거현장 무너짐 사고 발생으로 서대문역~경찰청앞 도로 통제 및 경의중앙선 서울~수색구간 양방향 운행 중지. 교통정보 확인 바랍니다. [서울특별시]N"}, {"time": "16:25:55", "title": "오늘 14:32경 서울 서소문고가도로 철거공사 중 붕괴사고로 인해 경의중앙선 서울역행 열차는 수색역~문산역까지만 운행하며, 용산행 열차는 정상운행합니다[고양시청]N"}]}, {"x": "2026-05-26", "y": 17, "v": 2, "alerts": [{"time": "17:37:40", "title": "서울 서대문구 서소문 고가도로 철거공사 중 붕괴로 서울역~수색역 구간 전동열차 운행중지 알림 △1호선 및 경의중앙선(문산~용산~용문) 정상운행 중[한국철도공사]N"}, {"time": "17:40:07", "title": "서소문고가 철거현장 무너짐 사고로 인해 서대문역~경찰청앞 도로 통제 및 경의중앙선 서울역~수색역 구간 양방향 운행 중지. 교통정보 확인 바랍니다. [서울특별시]N"}]}, {"x": "2026-05-26", "y": 18, "v": 1, "alerts": [{"time": "18:09:29", "title": "서소문고가 철거현장 무너짐 사고로 경의중앙선 서울역~수색역 구간 양방향 운행 중지. 수색역 이용 시 운행정보 확인 바랍니다.(수색~문산 구간은 운행 중)[은평구]N"}]}, {"x": "2026-05-26", "y": 19, "v": 0, "alerts": []}, {"x": "2026-05-26", "y": 20, "v": 0, "alerts": []}, {"x": "2026-05-26", "y": 21, "v": 0, "alerts": []}, {"x": "2026-05-26", "y": 22, "v": 1, "alerts": [{"time": "22:00:21", "title": "서소문 고가 붕괴사고 수습을 위해 5월 27일 첫차부터 경의선 서울~수색 구간 전동열차 운행중지 △1호선 및 경의중앙선(문산~용산~용문) 정상운행[한국철도공사]N"}]}, {"x": "2026-05-26", "y": 23, "v": 0, "alerts": []}, {"x": "2026-05-27", "y": 0, "v": 0, "alerts": []}, {"x": "2026-05-27", "y": 1, "v": 0, "alerts": []}, {"x": "2026-05-27", "y": 2, "v": 0, "alerts": []}, {"x": "2026-05-27", "y": 3, "v": 0, "alerts": []}, {"x": "2026-05-27", "y": 4, "v": 0, "alerts": []}, {"x": "2026-05-27", "y": 5, "v": 0, "alerts": []}, {"x": "2026-05-27", "y": 6, "v": 1, "alerts": [{"time": "06:00:26", "title": "서소문 고가 붕괴사고 수습을 위해 오늘 첫차부터 경의선 서울~수색 구간 전동열차 운행중지 △1호선 및 경의중앙선(문산~용산~용문) 정상운행 [한국철도공사]N"}]}, {"x": "2026-05-27", "y": 7, "v": 0, "alerts": []}, {"x": "2026-05-27", "y": 8, "v": 0, "alerts": []}, {"x": "2026-05-27", "y": 9, "v": 0, "alerts": []}, {"x": "2026-05-27", "y": 10, "v": 0, "alerts": []}, {"x": "2026-05-27", "y": 11, "v": 0, "alerts": []}, {"x": "2026-05-27", "y": 12, "v": 0, "alerts": []}, {"x": "2026-05-27", "y": 13, "v": 0, "alerts": []}, {"x": "2026-05-27", "y": 14, "v": 0, "alerts": []}, {"x": "2026-05-27", "y": 15, "v": 0, "alerts": []}, {"x": "2026-05-27", "y": 16, "v": 0, "alerts": []}, {"x": "2026-05-27", "y": 17, "v": 1, "alerts": [{"time": "17:34:47", "title": "서소문 고가도로 붕괴로 열차운행 차질, 이용 전 확인바랍니다. ※ 행신~서울/용산구간 KTX 운행중지 ※ 강릉/중앙선 KTX-이음 서울~청량리 운행중지 [코레일]N"}]}, {"x": "2026-05-27", "y": 18, "v": 0, "alerts": []}, {"x": "2026-05-27", "y": 19, "v": 0, "alerts": []}, {"x": "2026-05-27", "y": 20, "v": 0, "alerts": []}, {"x": "2026-05-27", "y": 21, "v": 0, "alerts": []}, {"x": "2026-05-27", "y": 22, "v": 1, "alerts": [{"time": "22:00:54", "title": "서소문 고가 붕괴사고로 복구완료될 때까지 경의선 서울역~수색역 구간 전동열차 운행을 중지합니다 △1호선 및 경의중앙선(문산~용산~용문) 정상운행 [한국철도공사]N"}]}, {"x": "2026-05-27", "y": 23, "v": 0, "alerts": []}, {"x": "2026-05-28", "y": 0, "v": 0, "alerts": []}, {"x": "2026-05-28", "y": 1, "v": 0, "alerts": []}, {"x": "2026-05-28", "y": 2, "v": 0, "alerts": []}, {"x": "2026-05-28", "y": 3, "v": 0, "alerts": []}, {"x": "2026-05-28", "y": 4, "v": 0, "alerts": []}, {"x": "2026-05-28", "y": 5, "v": 0, "alerts": []}, {"x": "2026-05-28", "y": 6, "v": 1, "alerts": [{"time": "06:00:18", "title": "서소문 고가 붕괴사고로 복구완료될 때까지 경의선 서울역~수색역 구간 전동열차 운행을 중지합니다 △1호선 및 경의중앙선(문산~용산~용문) 정상운행 [한국철도공사]N"}]}, {"x": "2026-05-28", "y": 7, "v": 0, "alerts": []}, {"x": "2026-05-28", "y": 8, "v": 0, "alerts": []}, {"x": "2026-05-28", "y": 9, "v": 0, "alerts": []}, {"x": "2026-05-28", "y": 10, "v": 1, "alerts": [{"time": "10:20:41", "title": "서소문 고가도로 붕괴로 열차운행 차질이 발생중이니 이용 전 확인 바랍니다. ※ KTX 행신~서울/용산 구간, 강릉/중앙선 서울~청량리 구간 운행중지[코레일]N"}]}, {"x": "2026-05-28", "y": 11, "v": 0, "alerts": []}, {"x": "2026-05-28", "y": 12, "v": 0, "alerts": []}, {"x": "2026-05-28", "y": 13, "v": 0, "alerts": []}, {"x": "2026-05-28", "y": 14, "v": 0, "alerts": []}, {"x": "2026-05-28", "y": 15, "v": 0, "alerts": []}, {"x": "2026-05-28", "y": 16, "v": 0, "alerts": []}, {"x": "2026-05-28", "y": 17, "v": 0, "alerts": []}, {"x": "2026-05-28", "y": 18, "v": 0, "alerts": []}, {"x": "2026-05-28", "y": 19, "v": 0, "alerts": []}, {"x": "2026-05-28", "y": 20, "v": 0, "alerts": []}, {"x": "2026-05-28", "y": 21, "v": 2, "alerts": [{"time": "21:29:43", "title": "서소문 고가 철거공사 관련 오늘 밤12시부터 2호선 을지로입구역~홍대입구역 구간 열차운행을 중단합니다. 열차 이용에 참고하시기 바랍니다.[서울교통공사]N"}, {"time": "21:45:09", "title": "오늘 22시~내일 07시까지 서소문 고가 철거공사로 소음, 분진 발생 및 교통통제 예정. 안전에 유의하시고, 차량은 우회 바랍니다.[서울특별시]N"}]}, {"x": "2026-05-28", "y": 22, "v": 1, "alerts": [{"time": "22:02:26", "title": "서소문고가 붕괴사고로 복구완료될 때까지 경의선 서울역~수색역 구간 전동열차 운행을 중지합니다. △1호선 및 경의중앙선(문산~용산~용문) 정상운행 [한국철도공사]N"}]}, {"x": "2026-05-28", "y": 23, "v": 0, "alerts": []}, {"x": "2026-05-29", "y": 0, "v": 0, "alerts": []}, {"x": "2026-05-29", "y": 1, "v": 0, "alerts": []}, {"x": "2026-05-29", "y": 2, "v": 0, "alerts": []}, {"x": "2026-05-29", "y": 3, "v": 0, "alerts": []}, {"x": "2026-05-29", "y": 4, "v": 0, "alerts": []}, {"x": "2026-05-29", "y": 5, "v": 1, "alerts": [{"time": "05:57:52", "title": "서소문 고가 철거공사 관련 지하철 시설물 점검이 완료되어 현재 2호선 열차가 정상 운행됩니다. 열차 이용에 참고하시기 바랍니다.[서울교통공사]N"}]}, {"x": "2026-05-29", "y": 6, "v": 1, "alerts": [{"time": "06:00:15", "title": "서소문고가 붕괴사고로 복구완료될 때까지 경의선 서울역~수색역 구간 전동열차 운행을 중지합니다. △1호선 및 경의중앙선(문산~용산~용문) 정상운행 [한국철도공사]N"}]}, {"x": "2026-05-29", "y": 7, "v": 0, "alerts": []}, {"x": "2026-05-29", "y": 8, "v": 0, "alerts": []}, {"x": "2026-05-29", "y": 9, "v": 1, "alerts": [{"time": "09:50:18", "title": "서소문 고가도로 붕괴로 열차운행 차질이 발생중이니 이용 전 확인 바랍니다. ※ KTX 행신~서울/용산 구간, 강릉/중앙선 서울~청량리 구간 운행중지[한국철도공사]N"}]}, {"x": "2026-05-29", "y": 10, "v": 0, "alerts": []}, {"x": "2026-05-29", "y": 11, "v": 0, "alerts": []}, {"x": "2026-05-29", "y": 12, "v": 0, "alerts": []}, {"x": "2026-05-29", "y": 13, "v": 0, "alerts": []}, {"x": "2026-05-29", "y": 14, "v": 0, "alerts": []}, {"x": "2026-05-29", "y": 15, "v": 0, "alerts": []}, {"x": "2026-05-29", "y": 16, "v": 0, "alerts": []}, {"x": "2026-05-29", "y": 17, "v": 0, "alerts": []}, {"x": "2026-05-29", "y": 18, "v": 0, "alerts": []}, {"x": "2026-05-29", "y": 19, "v": 0, "alerts": []}, {"x": "2026-05-29", "y": 20, "v": 0, "alerts": []}, {"x": "2026-05-29", "y": 21, "v": 0, "alerts": []}, {"x": "2026-05-29", "y": 22, "v": 0, "alerts": []}, {"x": "2026-05-29", "y": 23, "v": 0, "alerts": []}, {"x": "2026-05-30", "y": 0, "v": 0, "alerts": []}, {"x": "2026-05-30", "y": 1, "v": 0, "alerts": []}, {"x": "2026-05-30", "y": 2, "v": 0, "alerts": []}, {"x": "2026-05-30", "y": 3, "v": 0, "alerts": []}, {"x": "2026-05-30", "y": 4, "v": 0, "alerts": []}, {"x": "2026-05-30", "y": 5, "v": 1, "alerts": [{"time": "05:59:36", "title": "금일 현재 서소문 고가도로 사고 복구가 완료되어 경의선(서울역행)이 정상운행함을 알려드립니다. 경의선(문산역~서울역) 정상운행 알림[파주시]N"}]}, {"x": "2026-05-30", "y": 6, "v": 1, "alerts": [{"time": "06:00:13", "title": "서소문 고가 철거 및 시설물 복구 작업이 완료되어 경의선 서울~문산 구간 전동열차는 현시각부로 정상운행합니다 ▲수도권 광역철도 전 구간 정상운행 중[한국철도공사]N"}]}, {"x": "2026-05-30", "y": 7, "v": 1, "alerts": [{"time": "07:06:23", "title": "서소문 고가차도 붕괴 복구로 열차운행이 단계적 정상화중이니 이용 전 확인바랍니다. ※KTX 행신~서울/용산 구간, 강릉/중앙선 서울~청량리 구간 운행재개[코레일]N"}]}, {"x": "2026-05-30", "y": 8, "v": 0, "alerts": []}, {"x": "2026-05-30", "y": 9, "v": 0, "alerts": []}, {"x": "2026-05-30", "y": 10, "v": 0, "alerts": []}, {"x": "2026-05-30", "y": 11, "v": 0, "alerts": []}, {"x": "2026-05-30", "y": 12, "v": 0, "alerts": []}, {"x": "2026-05-30", "y": 13, "v": 0, "alerts": []}, {"x": "2026-05-30", "y": 14, "v": 0, "alerts": []}, {"x": "2026-05-30", "y": 15, "v": 0, "alerts": []}, {"x": "2026-05-30", "y": 16, "v": 0, "alerts": []}, {"x": "2026-05-30", "y": 17, "v": 0, "alerts": []}, {"x": "2026-05-30", "y": 18, "v": 0, "alerts": []}, {"x": "2026-05-30", "y": 19, "v": 0, "alerts": []}, {"x": "2026-05-30", "y": 20, "v": 0, "alerts": []}, {"x": "2026-05-30", "y": 21, "v": 0, "alerts": []}, {"x": "2026-05-30", "y": 22, "v": 0, "alerts": []}, {"x": "2026-05-30", "y": 23, "v": 0, "alerts": []}];
    const dateLabels = ["2026-05-26", "2026-05-27", "2026-05-28", "2026-05-29", "2026-05-30"];
    const hourLabels = Array.from({length: 24}, (_, i) => i);

    new Chart(ctx, {
        type: 'matrix',
        data: {
            datasets: [{
                label: '발송 건수',
                data: matrixData,
                backgroundColor(c) {
                    const v = c.raw ? c.raw.v : 0;
                    if (v === 0) return '#f8fafc';
                    const alpha = 0.2 + (v / 5) * 0.8;
                    return `rgba(30, 58, 138, ${alpha})`; 
                },
                width: ({chart}) => (chart.chartArea?.width || 0) / dateLabels.length - 2,
                height: ({chart}) => (chart.chartArea?.height || 0) / 24 - 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                                tooltip: {
                    callbacks: {
                        title: (items) => {
                            const item = items[0].raw;
                            return `${item.x} ${item.y}시`;
                        },
                        label: (c) => {
                            const v = c.raw.v;
                            const alerts = c.raw.alerts || [];
                            let res = [`발송: ${v}건`];
                            if (alerts.length > 0) {
                                res.push('');
                                alerts.forEach(a => {
                                    const t = a.title;
                                    const time = a.time;
                                    const displayTitle = t.length > 50 ? t.substring(0, 47) + '...' : t;
                                    res.push(`• [${time}] ${displayTitle}`);
                                });
                            }
                            return res;
                        }
                    }
                }
            },
            scales: {
                x: { 
                    type: 'category', 
                    labels: dateLabels, 
                    grid: { display: false },
                    ticks: {
                        callback: function(val, index) {
                            const label = this.getLabelForValue(val);
                            const counts = {
                                "2026-05-26": "(11건)",
                                "2026-05-27": "(2건)",
                                "2026-05-28": "(3건)",
                                "2026-05-29": "(2건)",
                                "2026-05-30": "(7건)"
                            };
                            return [label, counts[label] || ""];
                        }
                    }
                },
                y: { type: 'category', labels: hourLabels, reverse: true, grid: { display: false } }
            }
        }
    });
}

// 2. 유튜브 댓글 및 트렌드 분석
function initYouTubeTrendCharts() {
    const youtubeCanvas = document.getElementById("youtubeChart");
    if (!youtubeCanvas) return;
    
    const youtubeLabels = ["알림 소음/설정불편", "중립 및 기타의견", "과도한 발송/피로감", "수신 지연/뒷북 불만"];
    const youtubeData = [26, 18, 17, 4];
    const youtubeTotal = youtubeData.reduce((a,b)=>a+b,0);

    new Chart(youtubeCanvas, {
        type: "pie",
        data: {
            labels: youtubeLabels,
            datasets: [{
                data: youtubeData,
                backgroundColor: [SOFT_BLUE.primary, SOFT_BLUE.secondary, SOFT_BLUE.accent, SOFT_BLUE.muted],
                borderColor: "#fff",
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: { display: true, text: "재난문자 관련 유튜브 댓글 분류 (총 65건)", font: { size: 18, family: 'Pretendard', weight: 'bold' }, padding: { bottom: 20 } },
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: (ctx) => {
                            const percent = ((ctx.parsed / youtubeTotal) * 100).toFixed(1);
                            return `${ctx.label}: ${ctx.parsed}건 (${percent}%)`;
                        }
                    }
                }
            }
        }
    });

    const trendCanvas = document.getElementById("trendChart");
    const groupData = {
        "재난문자 유형": ["긴급 재난 문자 18","위급 재난 문자 4","재난 안전 문자 12","안전 재난 문자 10"],
        "끄기 / 차단": ["재난 문자 끄기 20","아이폰 재난 문자 끄기 9","재난 문자 차단 6","아이폰 긴급 재난 문자 끄기 3","긴급 재난 문자 차단 2"],
        "디바이스 / 설정": ["아이폰 재난 문자 19","재난 문자 아이폰 18","재난 문자 설정 2"],
        "커뮤니티 / 기타": ["재난 문자 디시 3","재난 문자 다시 보기 3"]
    };

    new Chart(trendCanvas, {
        type: "bar",
        data: {
            labels: Object.keys(groupData),
            datasets: [{
                label: "비율 (%)",
                data: [34.1, 31.0, 30.2, 4.7],
                backgroundColor: SOFT_BLUE.secondary
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { 
                legend: { display: false },
                title: { display: true, text: "구글 트렌드 재난문자 관련 검색어 비중", font: { size: 18, family: 'Pretendard', weight: 'bold' }, padding: { bottom: 20 } }
            },
            onClick: (evt, elements) => {
                if (!elements.length) return;
                const idx = elements[0].index;
                const key = Object.keys(groupData)[idx];
                const ul = document.getElementById("keywordList");
                ul.innerHTML = "";
                groupData[key].forEach(v => {
                    const li = document.createElement("li");
                    li.textContent = v;
                    ul.appendChild(li);
                });
            }
        }
    });

    document.getElementById("chartSelect").addEventListener("change", (e) => {
        const type = e.target.value;
        const youtubeWrap = document.getElementById("youtubeWrap");
        const trendWrap = document.getElementById("trendWrap");
        
        if (type === "youtube") {
            youtubeWrap.style.display = "block";
            trendWrap.style.display = "none";
        } else {
            youtubeWrap.style.display = "none";
            trendWrap.style.display = "block";
        }
    });
}

// 3. 설문 조사 결과 (도넛 차트)
function initSurveyChart() {
    const canvas = document.getElementById('doughnutChart');
    if (!canvas) return;
    
    const labels = ['모두 읽는다', '첫 문장만 읽는다', '읽지 않는다'];
    const values = [18, 60, 11];
    const total = values.reduce((a, b) => a + b, 0);

    new Chart(canvas, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                data: values,
                backgroundColor: [SOFT_BLUE.primary, SOFT_BLUE.accent, SOFT_BLUE.pale],
                borderColor: 'white',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: '재난문자로 수신 받은 내용을 모두 읽습니까?',
                    font: { size: 18, weight: 'bold', family: 'Pretendard' },
                    padding: { bottom: 20 }
                },
                legend: { 
                    position: 'bottom',
                    labels: { padding: 30, font: { family: 'Pretendard', size: 14 } }
                },
                tooltip: {
                    callbacks: {
                        label: (ctx) => {
                            const percent = ((ctx.raw / total) * 100).toFixed(1);
                            return `${ctx.label}: ${ctx.raw}명 (${percent}%)`;
                        }
                    }
                }
            }
        }
    });
}

// 4. 수도권 시군구 지도 (Leaflet)
function initMap() {
    const mapContainer = document.getElementById('map');
    if (!mapContainer) return;
    
    const regionData = {"파주시": 17, "평택시": 14, "고양시덕양구": 15, "성동구": 18, "송파구": 18, "고양시일산동구": 15, "종로구": 18, "이천시": 14, "시흥시": 14, "노원구": 18, "성남시분당구": 14, "양주시": 14, "안산시단원구": 14, "과천시": 14, "연천군": 14, "오산시": 14, "광명시": 14, "관악구": 18, "동두천시": 14, "안산시상록구": 14, "화성시": 14, "수원시권선구": 14, "의왕시": 14, "안양시만안구": 14, "양천구": 18, "용인시처인구": 14, "양평군": 14, "은평구": 19, "구로구": 18, "남양주시": 14, "광주시": 14, "강서구": 18, "금천구": 18, "서초구": 18, "김포시": 14, "중랑구": 18, "아산시": 10, "수원시팔달구": 14, "가평군": 14, "의정부시": 14, "철원군": 10, "수원시영통구": 14, "중구": 19, "광진구": 18, "성북구": 18, "천안시서북구": 10, "도봉구": 18, "부천시": 14, "하남시": 14, "마포구": 18, "용인시기흥구": 14, "포천시": 14, "강동구": 18, "용인시수지구": 14, "동대문구": 18, "안성시": 14, "서대문구": 20, "동작구": 18, "성남시수정구": 14, "강북구": 18, "영등포구": 18, "용산구": 18, "군포시": 14, "고양시일산서구": 15, "성남시중원구": 14, "춘천시": 10, "수원시장안구": 14, "구리시": 14, "여주시": 14, "천안시동남구": 10, "강남구": 18, "안양시동안구": 14, "동구": 6, "남구": 6, "강화군": 6, "남동구": 6, "옹진군": 6, "계양구": 6, "부평구": 6, "연수구": 6, "서구": 6};

    const map = L.map('map').setView([37.5642, 126.9673], 12);
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png').addTo(map);

    map.createPane('topPane');
    map.getPane('topPane').style.zIndex = 650;

    // 1. 빨간색 커스텀 마커 설정 및 사고 지점 표시 (팝업 상시 노출)
    const redIcon = L.icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

    const incidentMarker = L.marker([37.5642, 126.9673], { icon: redIcon, pane: 'topPane' }).addTo(map);
    incidentMarker.bindPopup("<b>붕괴 사고 지점</b><br>서울특별시 서대문구 미근동", { autoClose: false, closeOnClick: false }).openPopup();

    // 2. 주요 지하철역 마커 추가 (상시 라벨 표시)
    const stations = [
        { name: "충정로역", coords: [37.5599, 126.9636] },
        { name: "시청역", coords: [37.5657, 126.9769] },
        { name: "서울역", coords: [37.5546, 126.9706] }
    ];

    stations.forEach(st => {
        L.marker(st.coords, { pane: 'topPane' }).addTo(map)
         .bindTooltip(st.name, { permanent: true, direction: 'top', className: 'station-label' });
    });

    // 3. 지하철 노선 경로 (수도권 전역 관통 전체 경로 보강)
    const subways = [
        // 1호선 (경인선 및 경부선 포함 전체)
        { name: "1호선", color: "#0052A4", coords: [[38.102, 127.075], [37.947, 127.061], [37.828, 127.054], [37.739, 127.045], [37.689, 127.046], [37.643, 127.050], [37.606, 127.055], [37.580, 127.044], [37.575, 127.025], [37.570, 126.991], [37.5657, 126.9769], [37.5546, 126.9706], [37.534, 126.969], [37.522, 126.945], [37.514, 126.924], [37.503, 126.882]] },
        { name: "1호선(인천행)", color: "#0052A4", coords: [[37.503, 126.882], [37.489, 126.862], [37.484, 126.782], [37.489, 126.724], [37.482, 126.671], [37.476, 126.617]] },
        { name: "1호선(신창행)", color: "#0052A4", coords: [[37.503, 126.882], [37.464, 126.903], [37.431, 126.920], [37.401, 126.922], [37.348, 126.947], [37.316, 126.971], [37.266, 127.000], [37.204, 127.052], [37.129, 127.068], [37.043, 127.069], [36.991, 127.085], [36.801, 127.146], [36.769, 126.951]] },
        // 2호선 (순환선 본선)
        { name: "2호선", color: "#00A84D", coords: [[37.5657, 126.9769], [37.566, 127.007], [37.561, 127.037], [37.544, 127.056], [37.540, 127.069], [37.535, 127.094], [37.513, 127.100], [37.507, 127.061], [37.498, 127.027], [37.484, 126.997], [37.476, 126.981], [37.481, 126.952], [37.482, 126.913], [37.489, 126.894], [37.508, 126.891], [37.525, 126.891], [37.534, 126.902], [37.548, 126.916], [37.557, 126.924], [37.555, 126.936], [37.559, 126.945], [37.5657, 126.9769]] },
        // 5호선 (방화-강동 및 하남/마천 지선)
        { name: "5호선", color: "#996CAC", coords: [[37.577, 126.812], [37.562, 126.801], [37.552, 126.811], [37.549, 126.851], [37.532, 126.877], [37.526, 126.891], [37.524, 126.896], [37.531, 126.914], [37.542, 126.934], [37.553, 126.956], [37.5599, 126.9636], [37.5657, 126.9769], [37.570, 126.976], [37.570, 127.002], [37.561, 127.037], [37.548, 127.076], [37.534, 127.123], [37.535, 127.132]] },
        { name: "5호선(하남행)", color: "#996CAC", coords: [[37.535, 127.132], [37.551, 127.144], [37.553, 127.164], [37.551, 127.186], [37.539, 127.223]] },
        { name: "5호선(마천행)", color: "#996CAC", coords: [[37.535, 127.132], [37.524, 127.144], [37.516, 127.143], [37.502, 127.147], [37.494, 127.152]] },
        // 경의중앙선 (문산-지평 전체)
        { name: "경의중앙선", color: "#77C4A3", coords: [[37.854, 126.788], [37.768, 126.777], [37.731, 126.774], [37.682, 126.769], [37.643, 126.811], [37.619, 126.832], [37.604, 126.864], [37.582, 126.895], [37.569, 126.913], [37.559, 126.936], [37.5599, 126.9636], [37.5546, 126.9706], [37.529, 126.964], [37.517, 127.003], [37.540, 127.020], [37.561, 127.037], [37.580, 127.044], [37.594, 127.086], [37.602, 127.109], [37.600, 127.143], [37.586, 127.214], [37.547, 127.329], [37.513, 127.426], [37.492, 127.491], [37.476, 127.640]] }
    ];

    subways.forEach(line => {
        L.polyline(line.coords, { color: line.color, weight: 5, opacity: 0.8, pane: 'topPane' })
        .addTo(map)
        .bindTooltip(line.name, { sticky: true });
    });

    function getColor(d) {
        return d > 15 ? 'rgba(8, 69, 148, 0.7)' : d > 10 ? 'rgba(33, 113, 181, 0.7)' : d > 5 ? 'rgba(66, 146, 198, 0.7)' : d > 1 ? 'rgba(107, 174, 214, 0.7)' : d > 0 ? 'rgba(158, 202, 225, 0.7)' : 'rgba(247, 251, 255, 0.7)';
    }

    function getRegionValue(props) {
        if (!props) return 0;
        const name = props.name;
        const code = String(props.code || "");
        if (name === "중구") {
            if (code.startsWith("11")) return regionData["중구"] || 0;
            if (code.startsWith("23")) return 6;
            return 0;
        }
        return regionData[name] || 0;
    }

    const info = L.control();
    info.onAdd = function (map) {
        this._div = L.DomUtil.create('div', 'info');
        this.update();
        return this._div;
    };
    info.update = function (props) {
        const val = getRegionValue(props);
        this._div.innerHTML = '<h4>수도권 재난문자 발송 현황</h4>' + (props ? `<b>${props.name}</b><br>${val} 건` : '지역 위에 마우스 오버');
    };
    info.addTo(map);

    const legend = L.control({position: 'bottomright'});
    legend.onAdd = function (map) {
        const div = L.DomUtil.create('div', 'info legend'), grades = [0, 1, 5, 10, 15];
        div.innerHTML += '<b>발송 건수</b><br>';
        for (var i = 0; i < grades.length; i++) {
            div.innerHTML += `<i style="background:${getColor(grades[i] + 0.1)}"></i> ${grades[i]}${grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+'}`;
        }
        return div;
    };
    legend.addTo(map);

    fetch('https://cdn.jsdelivr.net/gh/southkorea/southkorea-maps@master/kostat/2018/json/skorea-municipalities-2018-geo.json')
        .then(res => res.json())
        .then(data => {
            L.geoJson(data, {
                style: (feature) => {
                    const val = getRegionValue(feature.properties);
                    return { fillColor: getColor(val), weight: 1, opacity: 1, color: 'white', dashArray: '3', fillOpacity: 0.7 };
                },
                filter: (feature) => {
                    const code = String(feature.properties.code || "");
                    return code.startsWith("11") || code.startsWith("23") || code.startsWith("31");
                },
                onEachFeature: (feature, layer) => {
                    const val = getRegionValue(feature.properties);
                    layer.on({
                        mouseover: (e) => {
                            e.target.setStyle({ weight: 3, color: 'rgba(30, 58, 138, 0.8)', dashArray: '', fillOpacity: 0.9 });
                            info.update(feature.properties);
                        },
                        mouseout: (e) => {
                            e.target.setStyle({ weight: 1, color: 'white', dashArray: '3', fillOpacity: 0.7 });
                            info.update();
                        }
                    });
                    layer.bindPopup(`<b>${feature.properties.name}</b><br>재난문자 발송: ${val}건`);
                }
            }).addTo(map);
        });

    setTimeout(() => { map.invalidateSize(); }, 300);
    window.addEventListener('resize', () => { map.invalidateSize(); });
}
