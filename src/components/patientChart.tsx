import { Chart } from "react-google-charts";
import { ApiProps, PatientInfo } from "../data/models"

import { useSelector } from 'react-redux';
import { RootState } from '../modules/rootReducer';
import { useEffect, useState } from "react";

import { PatientStats } from '../data/models'

function PatientChart(props: ApiProps) {
    var chart_width = 300
    var chart_height = 250
    var chart_title_font_size = 16

    const f_gender = useSelector((state: RootState) => state.filter.gender)
    const f_race = useSelector((state: RootState) => state.filter.race)
    const f_ethnicity = useSelector((state: RootState) => state.filter.ethnicity)
    const f_death = useSelector((state: RootState) => state.filter.death)

    const [pie_data, setPieData] = useState<Array<PatientStats>>([])
    const [pie1, setPie1] = useState<Array<Array<any>>>([])
    const [pie2, setPie2] = useState<Array<Array<any>>>([])
    const [pie3, setPie3] = useState<Array<Array<any>>>([])
    const [pie4, setPie4] = useState<Array<Array<any>>>([])
    const [pie5, setPie5] = useState<Array<Array<any>>>([])

    useEffect(() => {
        fetch(props.api + "/api/patient/stats").then(res => res.json())
        .then(res => {
            setPieData(res['stats'])
        });
    }, [f_gender, f_race, f_ethnicity, f_death])

    useEffect(() => {
        setPie1(chartData(["gender"]))
        setPie2(chartData(["race"]))
        setPie3(chartData(["ethnicity"]))
        setPie4(chartData(["gender", "race"]))
        setPie5(chartData(["gender", "ethnicity"]))
    }, [pie_data])

    function chartData(s_list:Array<string>) {
        var temp_list:Array<any> = [['Patient', 'Number']]
        for (var j = 0; j < pie_data.length; j++) {
            var data = pie_data[j]
            if (f_gender !== "") {
                if (f_gender !== data.gender) {
                    continue
                }
            }
            if (f_race !== "") {
                if (f_race !== data.race) {
                    continue
                }
            }
            if (f_ethnicity !== "") {
                if (f_ethnicity !== data.ethnicity) {
                    continue
                }
            }

            var title = ""
            if (s_list.includes("gender")) {
                title += data.gender
            }
            if (s_list.includes("race")) {
                if (title !== "") {
                    title += " + "
                }
                title += data.race
            }
            if (s_list.includes("ethnicity")) {
                if (title !== "") {
                    title += " + "
                }
                title += data.ethnicity
            }

            var added_flag = false

            for (var i = 0; i < temp_list.length; i++) {
                if (temp_list[i][0] === title) {
                    temp_list[i][1] += data.count
                    added_flag = true
                    break
                }
            }

            if (!added_flag) {
                temp_list.push([title, data.count])
            }
        }

        return temp_list
    }

    return (
        <div className="p_chart_container">
            <Chart
                width={`${chart_width}px`}
                height={`${chart_height}px`}
                chartType="PieChart"
                loader={<div>Loading Chart</div>}
                data={pie1}
                options={{
                    title: '성별 환자 수',
                    titleTextStyle: {
                        fontSize: chart_title_font_size
                    }
                }}
                rootProps={{ 'data-testid': '1' }}
            />

            <Chart
                width={`${chart_width}px`}
                height={`${chart_height}px`}
                chartType="PieChart"
                loader={<div>Loading Chart</div>}
                data={pie2}
                options={{
                    title: '인종별 환자 수',
                    titleTextStyle: {
                        fontSize: chart_title_font_size
                    }
                }}
                rootProps={{ 'data-testid': '1' }}
            />

            <Chart
                width={`${chart_width}px`}
                height={`${chart_height}px`}
                chartType="PieChart"
                loader={<div>Loading Chart</div>}
                data={pie3}
                options={{
                    title: '민족별 환자 수',
                    titleTextStyle: {
                        fontSize: chart_title_font_size
                    }
                }}
                rootProps={{ 'data-testid': '1' }}
            />

            <Chart
                width={`${chart_width}px`}
                height={`${chart_height}px`}
                chartType="PieChart"
                loader={<div>Loading Chart</div>}
                data={pie4}
                options={{
                    title: '(성별 + 인종)별 환자 수',
                    titleTextStyle: {
                        fontSize: chart_title_font_size
                    }
                }}
                rootProps={{ 'data-testid': '1' }}
            />

            <Chart
                width={`${chart_width}px`}
                height={`${chart_height}px`}
                chartType="PieChart"
                loader={<div>Loading Chart</div>}
                data={pie5}
                options={{
                    title: '(성별 + 민족)별 환자 수',
                    titleTextStyle: {
                        fontSize: chart_title_font_size
                    }
                }}
                rootProps={{ 'data-testid': '1' }}
            />
        </div>
    )
}

export default PatientChart