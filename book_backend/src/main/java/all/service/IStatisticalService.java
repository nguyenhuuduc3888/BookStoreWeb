package all.service;

import all.dto.StatisticalDto;

import java.util.List;

public interface IStatisticalService {
    List<StatisticalDto> getList(String startDay, String endDay);
}
